/* =====================================================================
   i18n.js  —  潔諾Jessroin 網站的語言切換(中文 / English / 日本語 / 한국어)
   ===================================================================== */
(function () {
  'use strict';

  var DEFAULT_LANG = 'zh';   // 預設語言: zh / en / ja / ko
  var AUTO_DETECT  = false;  
  var FLOATING     = false;  
  var STORE_KEY    = 'jess-lang';

  var LANGS = [
    { code: 'zh', label: '中文',    html: 'zh-Hant' },
    { code: 'en', label: 'English', html: 'en' },
    { code: 'ja', label: '日本語',  html: 'ja' },
    { code: 'ko', label: '한국어',  html: 'ko' }
  ];
  var IDX = { en: 1, ja: 2, ko: 3 };

  /* 翻譯表: [ 中文, English, 日本語, 한국어 ] */
  var D = [
    /* ---------- 共用:選單、頁尾 ---------- */
    ['首頁', 'Home', 'ホーム', '홈'],
    ['委託須知', 'Commission Info', 'ご依頼について', '커미션 안내'],
    ['委託價目表', 'Price List', '料金表', '가격표'],
    ['作品集', 'Portfolio', '作品集', '포트폴리오'],
    ['合作夥伴', 'Partners', 'パートナー', '파트너'],
    ['委託試算', 'Get a Quote', 'お見積り', '견적 계산'],
    ['主選單', 'Main menu', 'メインメニュー', '메인 메뉴'],
    ['潔諾', 'Jessroin', '潔諾', 'Jessroin'],
    ['回覆時間：平日星期一至五 ・ 商業合作：',
      'Reply hours: Mon–Fri ・ Business inquiries: ',
      '返信時間：平日（月〜金） ・ お仕事のご相談：',
      '답장時間: 평일 월~금 ・ 비즈니스 문의: '],
    ['© 2026 潔諾 Jessroin。作品版權所有，請勿未經同意轉載使用。謝謝你來逛逛 ♡',
      '© 2026 潔諾 Jessroin. All artwork is copyrighted. Please do not repost or use it without permission. Thanks for stopping by ♡',
      '© 2026 潔諾 Jessroin。作品の著作権は作者に帰属します。無断転載・無断使用はご遠慮ください。ご覧いただきありがとうございます ♡',
      '© 2026 潔諾 Jessroin. 작품의 저작권은 작가에게 있으며, 무단 전재 및 사용을 금지합니다. 방문해 주셔서 감사합니다 ♡'],

    /* ---------- 首頁 ---------- */
    ['作品集&委託價目表', 'Portfolio & Price List', '作品集＆料金表', '포트폴리오 & 가격표'],
    ['潔諾Jessroin的作品集與委託價目表。承接正比、Q版、貼圖、塗鴉、插圖、VTuber。',
      'Portfolio and commission price list of Jessroin. Open for regular-proportion characters, chibi, stickers, doodles, illustrations and VTuber.',
      'Jessroin（潔諾）の作品集と料金表。等身キャラ、ちびキャラ、スタンプ、ラクガキ、イラスト、VTuberを承ります。',
      'Jessroin(潔諾)의 포트폴리오와 커미션 가격표. 일반 비율 캐릭터, 치비, 스티커, 낙서, 일러스트, VTuber 작업을 받습니다.'],
    ['潔諾的頭像', 'Avatar of Jessroin', '潔諾のアイコン', 'Jessroin의 프로필 이미지'],
    ['委託開放中', 'Commissions open', '依頼受付中', '커미션 오픈 중'],
    ['委託滿檔中', 'Commissions full', '依頼は満枠です', '커미션 마감'],
    ['目前滿檔', 'Currently full', '現在満枠です', '현재 마감'],
    ['哈囉～這裡是潔諾！', 'Hello~ I’m Jessroin!', 'こんにちは～ 潔諾です！', '안녕하세요~ 潔諾입니다!'],
    ['目前有8年接案經歷，是一位獨立遊戲創作者！',
      'I have 8 years of commission experience, and I’m an indie game creator!',
      '8年間の受注制作の経験があるインディーゲームクリエイターです！',
      '8년간의 커미션 작업 경력을 가진 인디 게임 크리에이터입니다!'],
    ['角色設計 ・ 插畫 ・ Q版人物 ・ VTuber',
      'Character design ・ Illustration ・ Chibi characters ・ VTuber',
      'キャラクターデザイン ・ イラスト ・ ちびキャラ ・ VTuber',
      '캐릭터 디자인 ・ 일러스트 ・ 치비 캐릭터 ・ VTuber'],
    ['看作品', 'View works', '作品を見る', '작품 보기'],

    /* ---------- 委託須知 ---------- */
    ['委託流程', 'Commission Process', 'ご依頼の流れ', '커미션 진행 절차'],
    ['填寫表單', 'Fill out the form', 'フォームに記入', '신청 폼 작성'],
    ['匯款20%\n訂金確定排單', 'Pay 20% deposit\nto secure your slot', '20%の前金を送金\nスケジュール確定', '선금 20% 입금\n작업 순서 확정'],
    ['確認\n委託內容', 'Confirm\ncommission details', '依頼内容の\n確認', '의뢰 내용\n확인'],
    ['彩色草稿\n確認', 'Approve\ncolor draft', 'カラーラフの\n確認', '컬러 러프\n확인'],
    ['匯款80%\n尾款', 'Pay remaining\n80% balance', '残り80%を\n送金', '잔금 80%\n입금'],
    ['完稿交件', 'Final delivery', '完成・納品', '완성본 납품'],

    ['價錢方面', 'Pricing', '料金について', '가격 관련'],
    ['價目表價錢皆為非商業委託',
      'All prices on the price list are for non-commercial commissions',
      '料金表の価格はすべて非商用のご依頼の場合の価格です',
      '가격표의 금액은 모두 비상업 커미션 기준입니다'],
    ['VTuber價錢皆為普通商用委託',
      'VTuber prices are for standard commercial use',
      'VTuberの価格はすべて「通常商用」ライセンス込みの価格です',
      'VTuber 가격은 모두 일반 상업 이용 기준입니다'],
    ['價錢依委託項目複雜程度做調漲，雙人為普通價格×2，多人價格另外討論',
      'Prices may increase depending on the complexity of the request. Two characters cost 2× the regular price; for three or more, the price is discussed separately',
      '依頼内容の複雑さに応じて料金が上がる場合があります。2人の場合は通常料金×2、3人以上は別途ご相談ください',
      '의뢰 내용의 복잡도에 따라 가격이 인상될 수 있습니다. 2인은 기본 가격×2, 3인 이상은 별도 협의합니다'],
    ['急件價錢以加急時間調整，基本急件價錢×1.5',
      'Rush fees depend on the deadline; the base rush fee is ×1.5',
      '急ぎの場合の料金は納期に応じて調整します。基本の特急料金は×1.5です',
      '급건 요금은 급한 정도에 따라 조정되며, 기본 급건 요금은 ×1.5입니다'],

    ['用途方面', 'Usage', 'ご利用範囲について', '사용 용도'],
    ['注意！實況者、VTuber皆為商用！',
      'Note: streamers and VTubers count as commercial use!',
      'ご注意：配信者・VTuberの方は商用扱いとなります！',
      '주의! 스트리머와 VTuber는 모두 상업 이용입니다!'],
    ['基本使用範圍：個人收藏使用 / 同人非營利作品使用 / 可縮放裁切 / 可註明出處後發布',
      'Basic usage scope: personal collection / non-profit fan works / resizing and cropping allowed / may be posted with credit',
      '基本の利用範囲：個人での鑑賞・保管／非営利の二次創作での使用／拡大縮小・トリミング可／出典を明記した上での公開可',
      '기본 사용 범위: 개인 소장 / 비영리 팬 작품에서의 사용 / 확대·축소 및 자르기 가능 / 출처 표기 후 게시 가능'],
    ['無論商業或非商業委託，只要有任何【觀看用】以外用途，皆需在委託時提前告知',
      'Whether commercial or non-commercial, any use other than viewing must be disclosed when you place the commission',
      '商用・非商用を問わず、【鑑賞用】以外の用途がある場合は、ご依頼時に事前にお知らせください',
      '상업·비상업 여부와 관계없이 【감상용】 이외의 용도가 있다면 의뢰 시 미리 알려 주세요'],
    ['委託成品會壓上水印，公開發佈當網路作品集',
      'Finished works carry a watermark and are posted publicly as part of my online portfolio',
      '完成作品には透かしを入れ、ネット上のポートフォリオとして公開します',
      '완성작에는 워터마크가 들어가며, 온라인 포트폴리오로 공개됩니다'],
    ['如不希望作品被發佈，或是有約定時間才能發佈，請提前告知',
      'If you do not want the work published, or it can only be published at an agreed time, please tell me in advance',
      '作品の公開を希望されない場合や、公開時期の指定がある場合は、事前にお知らせください',
      '작품 공개를 원하지 않거나 정해진 시기 이후에만 공개해야 한다면 미리 알려 주세요'],

    ['授權方面', 'Licensing', 'ライセンスについて', '라이선스'],
    ['價格以價目表所列之非商業委託價格為基準，依所選授權等級乘以對應倍率計算。例如價目表價格為1000元，選擇「普通商用」，費用為1000×2＝2000元。',
      'Prices are based on the non-commercial prices listed in the price list, multiplied by the rate for the license tier you choose. For example, if the listed price is NT$1000 and you choose “Standard Commercial”, the fee is 1000×2 = NT$2000.',
      '料金は、料金表に記載の非商用価格を基準に、選択したライセンス区分の倍率を掛けて計算します。例：料金表の価格が1000元で「通常商用」を選んだ場合、料金は1000×2＝2000元です。',
      '가격은 가격표에 기재된 비상업 커미션 가격을 기준으로, 선택한 라이선스 등급의 배율을 곱해 계산합니다. 예를 들어 가격표 가격이 1000 NT$이고 “일반 상업”을 선택하면 1000×2＝2000 NT$입니다.'],
    ['授權及讓與之範圍，以所選授權等級及雙方約定為準；約定不明確之部分，視為未授權、未讓與。',
      'The scope of any license or assignment is determined by the license tier you choose and our agreement; anything not clearly agreed is treated as not licensed and not assigned.',
      'ライセンス及び譲渡の範囲は、選択したライセンス区分および双方の取り決めによります。取り決めが不明確な部分は、未許諾・未譲渡とみなします。',
      '이용 허락 및 양도의 범위는 선택한 라이선스 등급과 양측의 합의에 따르며, 합의가 명확하지 않은 부분은 허락·양도하지 않은 것으로 봅니다.'],
    ['授權等級對照表', 'License Tier Comparison', 'ライセンス区分一覧', '라이선스 등급 비교표'],
    ['授權等級', 'License tier', 'ライセンス区分', '라이선스 등급'],
    ['倍率', 'Rate', '倍率', '배율'],
    ['販售營利', 'Selling for profit', '販売・営利利用', '판매·영리 이용'],
    ['作品公開', 'Public display', '作品の公開', '작품 공개'],
    ['著作財產權', 'Copyright (economic rights)', '著作財産権', '저작재산권'],
    ['普通商用', 'Standard Commercial', '通常商用', '일반 상업'],
    ['營利商用', 'Commercial (for profit)', '営利商用', '영리 상업'],
    ['非商買斷', 'Non-commercial Buyout', '非商用買い切り', '비상업 매절'],
    ['商用買斷', 'Commercial Buyout', '商用買い切り', '상업 매절'],
    ['全買斷', 'Full Buyout', '完全買い切り', '전체 매절'],
    ['不可', 'No', '不可', '불가'],
    ['可', 'Yes', '可', '가능'],
    ['公開', 'Public', '公開', '공개'],
    ['不公開', 'Private', '非公開', '비공개'],
    ['繪師保留', 'Retained by artist', '絵師が保持', '작가 보유'],
    ['讓與委託人', 'Transferred to client', '依頼者に譲渡', '의뢰인에게 양도'],
    ['倍率以非商業委託價格為基準。普通商用、營利商用之成品，預設壓上水印並公開發佈於作品集；如有不公開或延後公開之需求，請提前告知。',
      'Rates are based on the non-commercial price. Works under Standard Commercial and Commercial (for profit) are watermarked and posted publicly in my portfolio by default; if you need them kept private or posted later, please let me know in advance.',
      '倍率は非商用価格を基準としています。通常商用・営利商用の作品は、デフォルトで透かしを入れてポートフォリオに公開します。非公開または公開時期の延期をご希望の場合は、事前にお知らせください。',
      '배율은 비상업 커미션 가격을 기준으로 합니다. 일반 상업·영리 상업 작품은 기본적으로 워터마크를 넣어 포트폴리오에 공개되며, 비공개 또는 공개 시기 연기를 원하시면 미리 알려 주세요.'],

    ['名詞說明', 'Glossary', '用語の説明', '용어 설명'],
    ['營利行為：以收費方式販售作品或其衍生品，例如周邊、LINE貼圖',
      'Profit-making activity: selling the artwork or derivative products for a fee, such as merchandise or LINE stickers',
      '営利行為：作品やその派生物を有償で販売すること（例：グッズ、LINEスタンプ）',
      '영리 행위: 작품 또는 그 파생물을 유료로 판매하는 것 (예: 굿즈, LINE 스티커)'],
    ['買斷：委託人不希望作品被公開展示之等級，包含非商買斷、商用買斷、全買斷。其中僅全買斷涉及著作財產權之讓與',
      'Buyout: tiers for clients who do not want the work shown publicly, including Non-commercial Buyout, Commercial Buyout and Full Buyout. Only Full Buyout involves a transfer of copyright (economic rights)',
      '買い切り：作品を公開展示されたくない依頼者向けの区分で、非商用買い切り・商用買い切り・完全買い切りを含みます。著作財産権の譲渡を伴うのは完全買い切りのみです',
      '매절: 작품이 공개 전시되는 것을 원하지 않는 의뢰인을 위한 등급으로, 비상업 매절·상업 매절·전체 매절을 포함합니다. 이 중 전체 매절만 저작재산권 양도를 수반합니다'],
    ['著作財產權：依著作權法，指重製、改作、散布、公開傳輸等利用著作之權利，得全部或部分讓與他人',
      'Copyright (economic rights): under copyright law, the rights to use a work, such as reproduction, adaptation, distribution and public transmission; they may be assigned to others in whole or in part',
      '著作財産権：著作権法上、複製・翻案・頒布・公衆送信など著作物を利用する権利を指し、全部または一部を他人に譲渡することができます',
      '저작재산권: 저작권법상 복제, 개작(2차적 저작물 작성), 배포, 공중송신 등 저작물을 이용하는 권리를 말하며, 전부 또는 일부를 타인에게 양도할 수 있습니다'],
    ['讓與：將權利完全移轉給對方。與「授權」（僅允許在約定範圍內使用）不同，讓與後繪師即不再享有已讓與之權利',
      'Assignment: fully transferring a right to the other party. Unlike a “license” (which only permits use within an agreed scope), once rights are assigned the artist no longer holds them',
      '譲渡：権利を相手に完全に移転することです。合意した範囲内での使用のみを認める「ライセンス」とは異なり、譲渡後は絵師は譲渡した権利を持たなくなります',
      '양도: 권리를 상대방에게 완전히 이전하는 것입니다. 합의한 범위 내에서만 사용을 허락하는 “라이선스”와 달리, 양도 후에는 작가가 양도한 권리를 더 이상 보유하지 않습니다'],
    ['著作人格權：指公開發表權、姓名表示權及禁止不當修改權，專屬於創作者，依法不得讓與',
      'Moral rights: the right of first publication, the right of attribution and the right to prevent improper modification. They belong exclusively to the creator and cannot be assigned by law',
      '著作者人格権：公表権・氏名表示権・同一性保持権（不当な改変を禁止する権利）を指し、創作者に専属し、法律上譲渡できません',
      '저작인격권: 공표권, 성명표시권, 동일성유지권(부당한 변경을 금지할 권리)을 말하며, 창작자에게 전속되고 법적으로 양도할 수 없습니다'],

    ['共通規範', 'General Rules', '共通ルール', '공통 규정'],
    ['授權範圍以所選等級為限。超出範圍的使用（例如從非商業改為商業用途），需事先主動告知，取得我的同意並補上差價',
      'The license is limited to the tier you chose. For any use beyond that scope (for example, switching from non-commercial to commercial use), please tell me in advance, obtain my consent and pay the difference',
      'ライセンスの範囲は選択した区分に限られます。範囲外の使用（例：非商用から商用への変更）は、事前にご自身からお知らせいただき、私の同意を得たうえで差額をお支払いください',
      '라이선스 범위는 선택한 등급에 한합니다. 범위를 넘는 사용(예: 비상업에서 상업 용도로 변경)은 사전에 먼저 알리고, 저의 동의를 받은 뒤 차액을 지불해야 합니다'],
    ['除全買斷外，授權不可再轉授權或轉讓給第三人',
      'Except for Full Buyout, the license may not be sublicensed or transferred to third parties',
      '完全買い切りを除き、ライセンスの再許諾や第三者への譲渡はできません',
      '전체 매절을 제외하고, 라이선스를 재허락하거나 제3자에게 양도할 수 없습니다'],
    ['除全買斷外，未經同意不得改作（重新修改、重繪、二次加工、餵食給AI）。基本使用範圍內的縮放與裁切不在此限',
      'Except for Full Buyout, the work may not be modified (re-editing, redrawing, reprocessing, or feeding it to AI) without consent. Resizing and cropping within the basic usage scope are allowed',
      '完全買い切りを除き、同意なく改変（再修正・描き直し・二次加工・AIへの学習データとしての利用）することはできません。基本の利用範囲内での拡大縮小・トリミングはこの限りではありません',
      '전체 매절을 제외하고, 동의 없이 개작(재수정, 다시 그리기, 2차 가공, AI에 학습시키기)할 수 없습니다. 기본 사용 범위 내의 확대·축소 및 자르기는 예외입니다'],
    ['非買斷成品請勿移除或遮蓋水印與簽名',
      'For non-buyout works, please do not remove or cover the watermark or signature',
      '買い切り以外の作品では、透かしやサインを削除・隠さないでください',
      '매절이 아닌 작품은 워터마크와 서명을 제거하거나 가리지 마세요'],
    ['除全買斷外，請勿將成品轉售為素材',
      'Except for Full Buyout, please do not resell the work as asset material',
      '完全買い切りを除き、作品を素材として転売しないでください',
      '전체 매절을 제외하고, 완성작을 소재(에셋)로 재판매하지 마세요'],
    ['請勿將成品用於違法、詐欺、冒充本人，或損害我名譽的用途',
      'Please do not use the work for anything illegal or fraudulent, to impersonate me, or in any way that damages my reputation',
      '違法・詐欺・なりすまし、または私の名誉を損なう用途には使用しないでください',
      '완성작을 불법, 사기, 본인 사칭 또는 저의 명예를 훼손하는 용도로 사용하지 마세요'],
    ['著作人格權（例如姓名表示權）依法專屬於創作者，無法轉讓，買斷委託也一樣',
      'Moral rights (such as the right of attribution) belong exclusively to the creator by law and cannot be transferred, even in a buyout commission',
      '著作者人格権（氏名表示権など）は法律上創作者に専属し、譲渡できません。買い切りのご依頼でも同様です',
      '저작인격권(성명표시권 등)은 법적으로 창작자에게 전속되며 양도할 수 없습니다. 매절 의뢰도 마찬가지입니다'],

    ['注意事項', 'Notes', '注意事項', '유의 사항'],
    ['請在草稿確認後一周內匯款尾款，如無故失聯或拖延匯款，我有權終止委託，並且不會退換訂金',
      'Please pay the remaining balance within one week after the draft is approved. If you go out of contact or delay payment without reason, I reserve the right to terminate the commission and the deposit will not be refunded',
      'ラフ確認後1週間以内に残金をお支払いください。理由なく連絡が取れなくなった場合や支払いが遅れた場合、私は依頼を打ち切る権利を有し、前金は返金いたしません',
      '초안 확인 후 일주일 이내에 잔금을 입금해 주세요. 이유 없이 연락이 두절되거나 입금을 지연하면 저는 의뢰를 종료할 권리가 있으며 선금은 환불되지 않습니다'],
    ['如我方無故失聯超過一周，除無法預料因素（如：帳號被盜 / 被停權），委託人有權提出退還全款',
      'If I am out of contact for over a week without reason (except for unforeseeable causes such as account theft or suspension), the client may request a full refund',
      '私が理由なく1週間以上連絡不能となった場合（アカウントの乗っ取り・凍結など予測できない事情を除く）、依頼者は全額返金を請求できます',
      '제가 이유 없이 일주일 넘게 연락이 두절되는 경우(계정 도용·정지 등 예측할 수 없는 사유 제외), 의뢰인은 전액 환불을 요청할 수 있습니다'],
    ['提供資料請詳細完整，不知道怎麼給設定，建議使用Google雲端給共用連結',
      'Please provide complete, detailed reference materials. If you are not sure how to share your character settings, I suggest sharing a link via Google Drive',
      '資料は詳しく漏れなくご提供ください。設定資料の渡し方が分からない場合は、Googleドライブの共有リンクをおすすめします',
      '자료는 상세하고 빠짐없이 제공해 주세요. 설정 자료를 어떻게 줘야 할지 모르겠다면 Google 드라이브 공유 링크를 추천합니다'],
    ['有3次免費修改機會，超過3次會加收費用，請盡量一次提出要修改的地方',
      'You get 3 free revisions; additional revisions are charged extra. Please try to list all the changes you want at once',
      '無料の修正は3回までです。3回を超えると追加料金がかかりますので、修正点はできるだけまとめてお伝えください',
      '무료 수정은 3회까지이며, 초과 시 추가 요금이 부과됩니다. 수정할 부분은 가능한 한 한 번에 알려 주세요'],
    ['初次公開發文請一定要標註繪師【潔諾】，推特發文可標註@Jessroin',
      'When you first post the work publicly, please credit the artist 【潔諾】; on Twitter, you can tag @Jessroin',
      '初めて公開投稿する際は、必ず絵師【潔諾】のクレジットを明記してください。Twitterでは @Jessroin をタグ付けしていただけます',
      '처음 공개 게시할 때는 반드시 작가 【潔諾】를 표기해 주세요. 트위터에는 @Jessroin을 태그하시면 됩니다'],

    ['可接類型', 'Accepted Types', '対応できるジャンル', '받는 장르'],
    ['二創', 'Fan works', '二次創作', '2차 창작'],
    ['原創', 'Original works', 'オリジナル', '오리지널'],
    ['夢向', 'Reader-insert (Yume)', '夢向け', '드림 (夢向)'],
    ['不接類型', 'Not Accepted', '対応できないジャンル', '받지 않는 장르'],
    ['非人形', 'Non-humanoid', '非人型', '비인간형'],
    ['爭議作品', 'Controversial works', '論争のある作品', '논란이 있는 작품'],
    ['人中之龍夢向', 'Yakuza (Like a Dragon) reader-insert', '「龍が如く」夢向け', '용과 같이 드림'],
    ['付款方式', 'Payment Methods', 'お支払い方法', '결제 방법'],
    ['匯款轉帳 / 無摺', 'Bank transfer / passbook-free deposit', '銀行振込／通帳なし入金', '계좌이체 / 무통장 입금'],
    ['PayPal（+5%手續費）', 'PayPal (+5% fee)', 'PayPal（手数料+5%）', 'PayPal (수수료 +5%)'],
    ['超商代碼\n（+32元NTD手續費）', 'Convenience store payment code\n(+NT$32 fee)', 'コンビニ支払いコード\n（手数料+32台湾ドル）', '편의점 결제 코드\n(수수료 +32 NT$)'],

    /* ---------- 合作夥伴 ---------- */
    ['承接項目：coverPV／待機畫面／OP／ED／轉場畫面／手書',
      'Services: cover PV / standby screens / OP / ED / transition screens / tegaki (hand-drawn) videos',
      '対応内容：coverPV／待機画面／OP／ED／転換画面／手書き',
      '의뢰 항목: cover PV / 대기 화면 / OP / ED / 전환 화면 / 손그림(手書) 영상'],
    ['承接項目：Live2D建模', 'Services: Live2D modeling', '対応内容：Live2Dモデリング', '의뢰 항목: Live2D 모델링'],
    ['前往連結', 'Visit link', 'リンクへ', '링크로 이동'],

    /* ---------- 作品集 ---------- */
    ['全部', 'All', 'すべて', '전체'],
    ['QQ人', 'Chibi', 'ちびキャラ', '치비'],
    ['插圖', 'Illustrations', 'イラスト', '일러스트'],
    ['VTuber', 'VTuber', 'VTuber', 'VTuber'],
    ['動態展示', 'Motion', 'モーション', '모션'],
    ['作品載入中…', 'Loading works…', '作品を読み込み中…', '작품 불러오는 중…'],
    ['這個分類還沒有作品,敬請期待 ♡', 'No works in this category yet — stay tuned ♡', 'このカテゴリにはまだ作品がありません。お楽しみに ♡', '이 카테고리에는 아직 작품이 없어요. 기대해 주세요 ♡'],
    ['這個分類還沒有作品，敬請期待 ♡', 'No works in this category yet — stay tuned ♡', 'このカテゴリにはまだ作品がありません。お楽しみに ♡', '이 카테고리에는 아직 작품이 없어요. 기대해 주세요 ♡'],
    ['圖片準備中', 'Image coming soon', '画像準備中', '이미지 준비 중'],
    ['這支影片無法播放:請確認檔案存在,且是 MP4(H.264)格式', 'This video cannot be played. Please check that the file exists and is in MP4 (H.264) format', 'この動画は再生できません。ファイルが存在するか、MP4（H.264）形式かご確認ください', '이 영상을 재생할 수 없어요. 파일이 있는지, MP4(H.264) 형식인지 확인해 주세요'],
    ['關閉', 'Close', '閉じる', '닫기'],
    ['上一張', 'Previous', '前へ', '이전'],
    ['下一張', 'Next', '次へ', '다음'],

    /* ---------- 委託價目表 (price.html) ---------- */
    ['軟糖', 'Gummy', 'グミ', '젤리'],
    ['塗鴉', 'Doodle', 'ラクガキ', '낙서'],
    ['頭貼', 'Avatar', 'アイコン', '프로필 사진'],
    ['半身', 'Half-body', '半身', '반신'],
    ['全身／立繪', 'Full Body / Standing Art', '全身／立ち絵', '전신/입상 일러스트'],
    ['貼圖', 'Stickers', 'スタンプ', '스티커'],
    ['範例圖', 'Sample Image', 'サンプル画像', '샘플 이미지'],
    
    ['塗鴉（非商業價格）', 'Doodle (Non-commercial)', 'ラクガキ（非商用価格）', '낙서 (비상업 가격)'],
    ['塗鴉驚喜包', 'Doodle Surprise Pack', 'ラクガキサプライズパック', '낙서 서프라이즈 팩'],
    ['可隨意打賞，內容依打賞價格，可能包含頭貼、半身、全身、QQ人、組合頁',
      'Tips welcome; contents vary by tip amount and may include avatar, half-body, full-body, chibi, or collage sheet',
      '金額に応じてアイコン、半身、全身、ちびキャラ、まとめページなどをお描きします',
      '자유로운 팁 가능, 팁 금액에 따라 프로필 사진, 반신, 전신, 치비, 종합 페이지 등이 포함될 수 있습니다'],
    ['一律為純底色塗鴉，可指定方向，但不可指定內容',
      'Flat color doodles only; general direction may be requested, but specific content cannot be requested',
      'すべてベタ塗りラクガキです。大まかな方向性の指定は可能ですが、詳細なリクエストはできません',
      '모두 단색 낙서입니다. 대략적인 방향 지정은 가능하나 세부 내용은 지정할 수 없습니다'],
    ['驚喜包基本為頭貼塗鴉', 'Surprise pack is base-level avatar doodle', 'サプライズパックは基本的にアイコンのラクガキです', '서프라이즈 팩은 기본적으로 프로필 사진 낙서입니다'],
    ['注意！塗鴉會有溢色、雜線！', 'Note: Doodles may have color overflow and rough lines!', 'ご注意！ラクガキには色ハミ出しやラフ線が含まれます！', '주의! 낙서 특성상 색 번짐이나 잡선이 있을 수 있습니다!'],
    ['工期：一週', 'Turnaround: 1 week', '納期：1週間', '작업 기간: 1주일'],
    ['工期：兩週', 'Turnaround: 2 weeks', '納期：2週間', '작업 기간: 2주일'],
    ['工期：三週', 'Turnaround: 3 weeks', '納期：3週間', '작업 기간: 3주일'],
    ['工期：一個月', 'Turnaround: 1 month', '納期：1ヶ月', '작업 기간: 1개월'],
    ['工期：一組一週', 'Turnaround: 1 week per set', '納期：1セット1週間', '작업 기간: 1세트당 1주일'],
    ['VTuber工期：1～2個月', 'VTuber turnaround: 1–2 months', 'VTuber納期：1〜2ヶ月', 'VTuber 작업 기간: 1~2개월'],

    ['QQ人（非商業價格）', 'Chibi (Non-commercial)', 'ちびキャラ（非商用価格）', '치비 (비상업 가격)'],
    ['精緻上色', 'Fine Coloring', '本格着色', '정교한 채색'],
    ['頭貼（非商業價格）', 'Avatar Icon (Non-commercial)', 'アイコン（非商用価格）', '프로필 사진 (비상업 가격)'],
    ['半身（非商業價格）', 'Half-body (Non-commercial)', '半身（非商用価格）', '반신 (비상업 가격)'],
    ['全身／立繪（非商業價格）', 'Full Body / Standing Art (Non-commercial)', '全身／立ち絵（非商用価格）', '전신/입상 일러스트 (비상업 가격)'],

    ['插圖（非商業價格）', 'Illustration (Non-commercial)', 'イラスト（非商用価格）', '일러스트 (비상업 가격)'],
    ['插圖皆為精緻上色，依插圖複雜程度，價格可能往上調漲',
      'All illustrations include fine coloring; price may increase based on complexity',
      'イラストはすべて本格着色です。複雑さにより料金が上がる場合があります',
      '일러스트는 모두 정교한 채색 기준이며, 복잡도에 따라 가격이 인상될 수 있습니다'],
    ['半身插圖', 'Half-body Illustration', '半身イラスト', '반신 일러스트'],
    ['人物範圍在腰到腿', 'Framed from waist to legs', '人物の範囲：腰から脚まで', '캐릭터 범위: 허리에서 다리까지'],
    ['全身插圖', 'Full-body Illustration', '全身イラスト', '전신 일러스트'],
    ['人物範圍為全身', 'Framed full body', '人物の範囲：全身', '캐릭터 범위: 전신'],

    ['貼圖（普通商用價格）', 'Stickers (Standard Commercial)', 'スタンプ（通常商用価格）', '스티커 (일반 상업 가격)'],
    ['商用簡單貼圖', 'Commercial Simple Sticker', '商用シンプルスタンプ', '상업용 심플 스티커'],
    ['一組5張 NT$ 1,700，會依設定複雜程度調漲',
      'Set of 5: NT$ 1,700; price may increase depending on complexity',
      '5個セット 1,700台湾ドル、デザインの複雑さにより調整あり',
      '5장 1세트 1,700 NT$, 설정 복잡도에 따라 인상될 수 있음'],
    ['商用會員徽章', 'Commercial Member Badge', '商用メンバーバッジ', '상업용 멤버십 배지'],
    ['YouTube會員徽章：6格', 'YouTube Member Badges: 6 slots', 'YouTubeメンバーバッジ：6枠', 'YouTube 멤버십 배지: 6칸'],
    ['Twitch訂閱層級徽章：8格', 'Twitch Tier Sub Badges: 8 slots', 'Twitchサブスクバッジ：8枠', 'Twitch 구독 배지: 8칸'],

    ['VTuber（普通商用價格）', 'VTuber (Standard Commercial)', 'VTuber（通常商用価格）', 'VTuber (일반 상업 가격)'],
    ['Q版全身VTuber', 'Chibi Full-body VTuber', 'ちびキャラ全身VTuber', '치비 전신 VTuber'],
    ['正比半身VTuber', 'Regular Half-body VTuber', '通常頭身の半身VTuber', '일반 비율 반신 VTuber'],
    ['正比全身VTuber', 'Regular Full-body VTuber', '通常頭身の全身VTuber', '일반 비율 전신 VTuber'],
    ['含拆建，基本包含黑臉／害羞表情',
      'Includes layer separation & build; includes shadow face / blush expressions',
      'パーツ分け込み、基本表情（青ざめ・照れ）付き',
      '파츠 분리 포함, 기본 표정(어두운 얼굴/수줍음) 포함'],
    ['加購項目', 'Add-on Options', '追加オプション', '추가 옵션'],
    ['獸耳尾巴', 'Animal ears & tail', 'けもみみ・しっぽ', '짐승귀·꼬리'],
    ['單件服裝／配件穿脫', 'Single outfit/accessory toggle', '衣装・小物1点の着脱', '의상/소품 1개 착탈'],
    ['另外繪製拆建', 'Requires extra layer separation drawing', '別途パーツ分け描画', '별도 파츠 분리 작업'],
    ['多一個表情', 'Extra expression', '表情の追加', '표정 1개 추가'],
    ['依表情複雜程度', 'Depending on expression complexity', '表情の複雑さによる', '표정 복잡도에 따라 조정'],
    ['依複雜程度調漲', 'Adjusted based on complexity', '複雑さにより調整', '복잡도에 따라 인상'],
    ['多一套衣服', 'Extra outfit', '衣装の追加', '의상 1벌 추가'],
    ['按鍵切換', 'Hotkey toggle', 'キー切り替え', '단축키 전환'],
    ['獸耳', 'Animal ears', 'けもみみ', '짐승귀'],
    ['底色上色三視圖', 'Base-color three-view sheet', 'ベタ塗り三面図', '밑색 3면도'],
    ['側面／背面／細節＆裝飾品', 'Side / back / details & accessories', '側面／背面／詳細・小物', '측면 / 후면 / 세부사항 및 장식품'],
    ['建模', 'Rigging / Modeling', 'モデリング', '모델링'],
    ['有合作建模師可以做一條龍（依建模需求估價）',
      'Full-service pipeline available with partner riggers (quoted per rigging request)',
      '提携モデラーによる一括制作可能（モデリング内容に応じてお見積り）',
      '협력 모델러를 통한 원스톱 제작 가능 (모델링 요구사항에 따라 견적)'],

    ['軟糖（非商業價格）', 'Gummy (Non-commercial)', 'グミ（非商用価格）', '젤리 (비상업 가격)'],
    ['一律為純底色塗鴉，完成度如圖',
      'Flat color doodles only; quality as shown in sample',
      'すべてベタ塗りラクガキです。完成度はサンプルの通りです',
      '모두 단색 낙서이며, 완성도는 샘플 이미지와 같습니다'],
    ['可指定動作，但軟糖比例問題，能做的動作不大',
      'Poses can be requested, but range of motion is limited due to gummy proportions',
      'ポーズの指定は可能ですが、グミの等身上、大きなポーズはできません',
      '포즈 지정은 가능하나 젤리 비율 특성상 큰 동작은 제한될 수 있습니다'],

    ['授權用途是什麼意思？', 'What does License Use mean?', 'ライセンス用途とは？', '라이선스 용도란 무엇인가요?'],
    ['角色繪製與插圖的價格是非商業價格，有其他用途時，依用途乘上倍率',
      'Character and illustration prices are non-commercial rates; for other uses, prices are multiplied by the rate tier',
      'キャラクター制作・イラストの価格は非商用価格です。その他の用途の場合は倍率を掛けて計算します',
      '캐릭터 및 일러스트 가격은 비상업 기준이며, 기타 용도로 사용 시 용도별 배율이 적용됩니다'],
    ['價目表基本價', 'Price List Base', '料金表基本額', '가격표 기본가'],
    ['非商業', 'Non-commercial', '非商用', '비상업'],
    ['非商×2', 'Non-comm x2', '非商用×2', '비상업×2'],
    ['發文、分享，以及印製作為免費發放之無料，不用於販售。VTuber、實況者之使用，最低須選擇本等級',
      'Posting, sharing, and printing as free giveaways (not for sale). VTubers and streamers must select at least this tier',
      '投稿・共有、および無料配布用ノベルティの印刷（販売不可）。VTuber・配信者の方は最低限この区分を選択してください',
      '게시, 공유 및 무료 배포용 선물 인쇄 (판매 불가). VTuber 및 스트리머는 최소 이 등급을 선택해야 합니다'],
    ['非商×3', 'Non-comm x3', '非商用×3', '비상업×3'],
    ['印製作為周邊販售、製作LINE貼圖等有營利行為之用途',
      'Profit-making uses such as selling merchandise or creating LINE stickers',
      'グッズとしての販売、LINEスタンプ制作など営利目的の使用',
      '굿즈 판매, LINE 스티커 제작 등 영리 목적의 용도'],
    ['非商×3～×10', 'Non-comm x3~x10', '非商用×3〜×10', '비상업×3~x10'],
    ['委託人不希望作品被公開展示時選擇，分為非商買斷、商用買斷與全買斷',
      'For clients who do not want the work displayed publicly; includes Non-commercial, Commercial, and Full Buyouts',
      '作品の公開を希望されない方向け。非商用買い切り・商用買い切り・完全買い切りがあります',
      '작품 공개를 원하지 않는 의뢰인용. 비상업 매절, 상업 매절, 전체 매절로 나뉩니다'],
    ['不確定該選哪一種？請先看', 'Not sure which to choose? Check the ', 'どれを選べばいいか分からない場合は、まず', '어떤 것을 선택해야 할지 모르겠다면 먼저 '],
    ['的授權方面，或委託前直接詢問', ' Licensing section, or ask me before commissioning', 'のライセンス項目をご確認いただくか、事前にご相談ください', '의 라이선스 부분을 확인하거나 의뢰 전 문의해 주세요'],

    /* ---------- 委託計價試算器 ---------- */
    ['委託計價試算器', 'Commission Price Calculator', '依頼料金シミュレーター', '커미션 견적 계산기'],
    ['單項委託內容試算', 'Calculate a Single Item', '単品のお見積り', '단일 항목 견적'],
    ['重置當前試算', 'Reset current calculation', '現在の計算をリセット', '현재 견적 초기화'],
    ['委託人暱稱 / ID', 'Client nickname / ID', '依頼者のニックネーム / ID', '의뢰인 닉네임 / ID'],
    ['例如：Alex', 'e.g. Alex', '例：Alex', '예: Alex'],
    ['日期', 'Date', '日付', '날짜'],
    ['基本項目', 'Basic Items', '基本メニュー', '기본 항목'],
    ['驚喜包', 'Surprise Pack', 'サプライズパック', '서프라이즈 팩'],
    ['精緻上色', 'Fine Coloring', '本格着色', '정교한 채색'],
    ['插圖類', 'Illustrations', 'イラスト類', '일러스트류'],
    ['貼圖 / 徽章', 'Stickers / Badges', 'スタンプ／バッジ', '스티커 / 배지'],
    ['標價已含普通商用 (x2)', 'Price includes Standard Commercial (x2)', '表示価格は通常商用 (x2) 込み', '표시 가격에 일반 상업 (x2) 포함'],
    ['商用簡單貼圖 (單張)', 'Commercial Simple Sticker (single)', '商用シンプルスタンプ（1個）', '상업용 심플 스티커 (1장)'],
    ['商用簡單貼圖 (一組5張)', 'Commercial Simple Stickers (set of 5)', '商用シンプルスタンプ（5個セット）', '상업용 심플 스티커 (5장 세트)'],
    ['商用會員徽章 (單張)', 'Commercial Member Badge (single)', '商用メンバーバッジ（1個）', '상업용 멤버십 배지 (1개)'],
    ['會員徽章 (單張)', 'Member Badge (single)', 'メンバーバッジ（1個）', '멤버십 배지 (1개)'],
    ['YT會員徽章 (6格組)', 'YT Member Badge Set (6 slots)', 'YTメンバーバッジ（6枠セット）', 'YT 멤버십 배지 (6칸 세트)'],
    ['YT 徽章 (6格)', 'YT Badges (6 slots)', 'YTバッジ（6枠）', 'YT 배지 (6칸)'],
    ['Twitch訂閱徽章 (8格組)', 'Twitch Sub Badge Set (8 slots)', 'Twitchサブスクバッジ（8枠セット）', 'Twitch 구독 배지 (8칸 세트)'],
    ['Twitch 徽章 (8格)', 'Twitch Badges (8 slots)', 'Twitchバッジ（8枠）', 'Twitch 배지 (8칸)'],
    ['Q版全身拆建模型 - 快速加購選項：', 'Chibi full-body model (layer separation & build) – quick add-ons:', 'ちびキャラ全身モデル（パーツ分け・構築）- クイック追加オプション：', '치비 전신 모델(파츠 분리·제작) - 빠른 추가 옵션:'],
    ['半身拆建模型 - 快速加購選項：', 'Half-body model (layer separation & build) – quick add-ons:', '半身モデル（パーツ分け・構築）- クイック追加オプション：', '반신 모델(파츠 분리·제작) - 빠른 추가 옵션:'],
    ['全身拆建模型 - 快速加購選項：', 'Full-body model (layer separation & build) – quick add-ons:', '全身モデル（パーツ分け・構築）- クイック追加オプション：', '전신 모델(파츠 분리·제작) - 빠른 추가 옵션:'],
    ['表情/個', 'Expression (each)', '表情／個', '표정/개'],
    ['服裝穿脫', 'Outfit toggle', '衣装の着脱', '의상 착탈'],
    ['單件服裝/配件穿脫(拆建)', 'Single outfit/accessory toggle (layer build)', '衣装・小物1点の着脱（パーツ分け）', '의상/소품 1개 착탈 (파츠 분리)'],
    ['當前試算項目名稱', 'Item name for this calculation', '今回の計算項目名', '현재 견적 항목명'],
    ['例如：QQ人精緻上色', 'e.g. Chibi fine coloring', '例：ちびキャラ本格着色', '예: 치비 정교한 채색'],
    ['非商用基本底價 (NT$)', 'Non-commercial base price (NT$)', '非商用の基本価格 (NT$)', '비상업 기본 가격 (NT$)'],
    ['（已折算非商底價）', '(converted to non-commercial base price)', '（非商用価格に換算済み）', '(비상업 기본가로 환산됨)'],
    ['授權用途 / 買斷類型', 'License use / Buyout type', 'ライセンス用途／買い切りタイプ', '라이선스 용도 / 매절 유형'],
    ['個人非商用 (原價 x1.0)', 'Personal non-commercial (base price x1.0)', '個人・非商用（原価 x1.0）', '개인 비상업 (원가 x1.0)'],
    ['普通商用 (非商 x2.0)', 'Standard commercial (non-commercial x2.0)', '通常商用（非商用の x2.0）', '일반 상업 (비상업 x2.0)'],
    ['營利商用 (非商 x3.0)', 'Commercial for profit (non-commercial x3.0)', '営利商用（非商用の x3.0）', '영리 상업 (비상업 x3.0)'],
    ['非商買斷 (非商 x3.0)', 'Non-commercial buyout (non-commercial x3.0)', '非商用買い切り（非商用の x3.0）', '비상업 매절 (비상업 x3.0)'],
    ['商用買斷 (非商 x5.0)', 'Commercial buyout (non-commercial x5.0)', '商用買い切り（非商用の x5.0）', '상업 매절 (비상업 x5.0)'],
    ['全買斷 (非商 x10.0)', 'Full buyout (non-commercial x10.0)', '完全買い切り（非商用の x10.0）', '전체 매절 (비상업 x10.0)'],
    ['個人非商用 (x1.0)', 'Personal non-commercial (x1.0)', '個人・非商用 (x1.0)', '개인 비상업 (x1.0)'],
    ['普通商用 (x2.0)', 'Standard commercial (x2.0)', '通常商用 (x2.0)', '일반 상업 (x2.0)'],
    ['營利商用 (x3.0)', 'Commercial for profit (x3.0)', '営利商用 (x3.0)', '영리 상업 (x3.0)'],
    ['非商買斷 (x3.0)', 'Non-commercial buyout (x3.0)', '非商用買い切り (x3.0)', '비상업 매절 (x3.0)'],
    ['商用買斷 (x5.0)', 'Commercial buyout (x5.0)', '商用買い切り (x5.0)', '상업 매절 (x5.0)'],
    ['全買斷 (x10.0)', 'Full buyout (x10.0)', '完全買い切り (x10.0)', '전체 매절 (x10.0)'],
    ['個人非商業用途', 'Personal non-commercial use', '個人の非商用利用', '개인 비상업 용도'],
    ['個人私人收藏、頭貼、非公開展示或個人發文',
      'Personal collection, profile picture, private display or personal posts',
      '個人での鑑賞・保管、アイコン、非公開での展示、個人の投稿',
      '개인 소장, 프로필 사진, 비공개 전시 또는 개인 게시'],
    ['發文印製為免費無料贈送（無販售等營利行為）',
      'Posting online or printing as free giveaways (no selling or other profit-making)',
      '投稿や、無料配布としての印刷（販売などの営利行為なし）',
      '게시 또는 무료 배포용 인쇄 (판매 등 영리 행위 없음)'],
    ['製作周邊販售、Line貼圖等營利行為',
      'Profit-making uses such as selling merchandise or LINE stickers',
      'グッズ販売、LINEスタンプなどの営利行為',
      '굿즈 판매, LINE 스티커 등 영리 행위'],
    ['無商業行為，但不希望委託圖被創作者公開展示',
      'No commercial use, but you do not want the artist to display the work publicly',
      '商用利用はないが、依頼作品を作者に公開展示されたくない場合',
      '상업 행위는 없지만 의뢰 작품이 작가에게 공개 전시되는 것을 원하지 않는 경우'],
    ['有商業行為，且不希望委託圖被創作者公開展示',
      'Commercial use, and you do not want the artist to display the work publicly',
      '商用利用があり、かつ依頼作品を作者に公開展示されたくない場合',
      '상업 행위가 있으며 의뢰 작품이 작가에게 공개 전시되는 것을 원하지 않는 경우'],
    ['包含商用買斷，著作財產權讓與委託人，可獲原檔自行修改、可不標註作者（著作人格權仍屬繪師）',
      'Includes Commercial Buyout; copyright (economic rights) is transferred to the client, who receives the source files to edit freely and may omit the artist credit (moral rights remain with the artist)',
      '商用買い切りを含み、著作財産権は依頼者に譲渡されます。元データを受け取って自由に改変でき、作者のクレジット表記も不要です（著作者人格権は絵師に残ります）',
      '상업 매절을 포함하며, 저작재산권이 의뢰인에게 양도됩니다. 원본 파일을 받아 직접 수정할 수 있고 작가 표기도 생략할 수 있습니다(저작인격권은 작가에게 남습니다)'],
    ['加急處理 (x1.5)', 'Rush order (x1.5)', '特急対応 (x1.5)', '급건 처리 (x1.5)'],
    ['加急處理', 'Rush order', '特急対応', '급건 처리'],
    ['其他加價細項 (例：複雜服飾、道具、加人)',
      'Other add-ons (e.g. complex outfits, props, extra characters)',
      'その他の追加項目（例：複雑な衣装、小物、キャラ追加）',
      '기타 추가 항목 (예: 복잡한 의상, 소품, 인원 추가)'],
    ['新增加價', 'Add surcharge', '追加料金を追加', '추가 요금 항목 추가'],
    ['例如：複雜背景/服飾', 'e.g. complex background / outfit', '例：複雑な背景／衣装', '예: 복잡한 배경/의상'],
    ['加價項目', 'Add-on', '追加項目', '추가 항목'],
    ['未命名項目', 'Untitled item', '名称未設定の項目', '이름 없는 항목'],
    ['當前試算單項小計：', 'Subtotal for this item:', '今回の項目の小計：', '현재 항목 소계:'],
    ['加入', 'Add to Receipt', '追加', '추가'],
    ['收據預覽', 'Receipt Preview', 'お見積書プレビュー', '견적서 미리보기'],
    ['委託人:', 'Client:', '依頼者:', '의뢰인:'],
    ['未填寫', 'Not provided', '未入力', '미입력'],
    ['尚未加入任何項目\n請在左側點選試算後點擊「加入」',
      'No items added yet\nSelect an item on the left, then click “Add to Receipt”',
      '項目がまだありません\n左側で項目を選び、「追加」を押してください',
      '아직 추가된 항목이 없습니다\n왼쪽에서 항목을 선택한 뒤 “추가”를 눌러 주세요'],
    ['全單總計金額', 'Total Amount', '合計金額', '총 금액'],
    ['首款訂金 (20%)', 'Deposit (20%)', '前金（20%）', '선금 (20%)'],
    ['完稿尾款 (80%)', 'Final payment (80%)', '完成後の残金（80%）', '완성 후 잔금 (80%)'],
    ['委託流程與規範：', 'Process & rules:', 'ご依頼の流れとルール：', '커미션 절차 및 규정:'],
    ['20%訂金排單 ➔ 確認內容 ➔ 彩色草稿 ➔ 80%尾款 ➔ 完稿交件',
      '20% deposit to book ➔ Confirm details ➔ Color draft ➔ 80% balance ➔ Final delivery',
      '20%の前金でスケジュール確定 ➔ 内容確認 ➔ カラーラフ ➔ 残り80% ➔ 納品',
      '20% 선금으로 순서 확정 ➔ 내용 확인 ➔ 컬러 러프 ➔ 80% 잔금 ➔ 완성본 납품'],
    ['（僅供潔諾的委託人使用）', '(For Jessroin’s clients only)', '（潔諾のご依頼者 ім専用）', '(潔諾 의뢰인 전용)'],
    ['複製文字結算單', 'Copy text receipt', 'テキストでコピー', '텍스트 견적서 복사'],
    ['下載圖片 (PNG 圖檔)', 'Download image (PNG)', '画像をダウンロード（PNG）', '이미지 다운로드 (PNG)'],
    ['清空結算單所有項目', 'Clear all items', 'すべての項目をクリア', '모든 항목 비우기'],
    ['我要委託', 'Request a Commission', '依頼する', '커미션 의뢰하기'],
    ['請先閱讀委託須知，再使用試算器估價，最後填寫委託表單',
      'Please read the commission info first, then use the calculator to get an estimate, and finally fill out the commission form',
      'まずご依頼についてお読みいただき、見積りで金額を確認してから、依頼フォームにご記入ください',
      '먼저 커미션 안내를 읽고, 견적 계산기로 금액을 확인한 뒤, 마지막으로 의뢰 폼을 작성해 주세요'],
    ['委託表單', 'Commission Form', '依頼フォーム', '의뢰 폼'],

    /* 提示訊息 */
    ['已複製文字結算單！', 'Text receipt copied!', 'テキストをコピーしました！', '텍스트 견적서를 복사했어요!'],
    ['已成功下載結算單圖片！', 'Receipt image downloaded!', '画像をダウンロードしました！', '견적서 이미지를 다운로드했어요!'],
    ['生成圖片失敗，請重試', 'Failed to create the image. Please try again', '画像の作成に失敗しました。もう一度お試しのうえ再試行してください', '이미지 생성에 실패했어요. 다시 시도해 주세요'],
    ['結算單目前為空，請先加入項目！', 'The receipt is empty. Please add an item first!', 'お見積書が空です。先に項目を追加してください！', '견적서가 비어 있어요. 먼저 항목을 추가해 주세요!'],
    ['正在生成圖檔，請稍候...', 'Creating the image, please wait...', '画像を作成中です。しばらくお待ちください...', '이미지를 만드는 중입니다. 잠시만 기다려 주세요...'],
    ['已重置當前試算內容', 'Calculation has been reset', '現在の計算をリセットしました', '현재 견적을 초기화했어요'],
    ['已清空結算單', 'Receipt cleared', 'お見積書をクリアしました', '견적서를 비웠어요'],
    ['已自結算單移除項目', 'Item removed from the receipt', 'お見積書から項目を削除しました', '견적서에서 항목을 삭제했어요'],

    /* 複製文字 / 下載圖片內容 */
    ['【委託估價明細】', '【Commission Estimate】', '【ご依頼のお見積り】', '【커미션 견적 내역】'],
    ['底價：', 'Base price: ', '基本料金：', '기본 가격: '],
    ['授權：', 'License: ', 'ライセンス：', '라이선스: '],
    ['特殊標註：加急處理 (x1.5)', 'Note: Rush order (x1.5)', '特記事項：特急対応 (x1.5)', '특이 사항: 급건 처리 (x1.5)'],
    ['小計：', 'Subtotal: ', '小計：', '소계: '],
    ['總計金額：', 'Total: ', '合計金額：', '총 금액: '],
    ['▶ 首款訂金 (20%)：', '▶ Deposit (20%): ', '▶ 前金（20%）：', '▶ 선금 (20%): '],
    ['▶ 完稿尾款 (80%)：', '▶ Final payment (80%): ', '▶ 残金（80%）：', '▶ 잔금 (80%): '],
    ['(確認排單)', '(confirms your slot)', '（スケジュール確定）', '(작업 순서 확정)'],
    ['(草稿確認後支付)', '(due after draft approval)', '（ラフ確認後にお支払い）', '(초안 확인 후 지불)'],
    ['【委託流程與規範】', '【Process & Rules】', '【ご依頼の流れとルール】', '【커미션 절차 및 규정】'],
    ['1. 匯款20%訂金確定排單 ＞ 2. 確認委託內容 ＞ 3. 彩色草稿確認 ＞ 4. 匯款80%尾款 ＞ 5. 完稿交件',
      '1. Pay 20% deposit to secure your slot ＞ 2. Confirm commission details ＞ 3. Approve color draft ＞ 4. Pay 80% balance ＞ 5. Final delivery',
      '1. 20%の前金を送金しスケジュール確定 ＞ 2. 依頼内容の確認 ＞ 3. カラーラフの確認 ＞ 4. 残り80%を送金 ＞ 5. 完成・納品',
      '1. 선금 20% 입금으로 작업 순서 확정 ＞ 2. 의뢰 내용 확인 ＞ 3. 컬러 러프 확인 ＞ 4. 잔금 80% 입금 ＞ 5. 완성본 납품']
  ];

  /* 變動句子對照 */
  var P = [
    ['^(.+) \\| 潔諾Jessroin$', '{1} | 潔諾Jessroin', '{1} | 潔諾Jessroin', '{1} | 潔諾Jessroin'],
    ['^(.+)的頭像$', '{1}’s avatar', '{1}のアイコン', '{1}의 프로필 이미지'],
    ['^作品 (\\d+)$', 'Work %1', '作品 %1', '작품 %1'],
    ['^(插圖|QQ人) (\\d+)$', '{1} %2', '{1} %2', '{1} %2'],
    ['^放大檢視 (.+)$', 'View larger: {1}', '拡大表示：{1}', '확대 보기: {1}'],
    ['^(.+) 的連結$', 'Link for {1}', '{1}のリンク', '{1} 링크'],
    ['^NT\\$ ([\\d,]+) / 張$', 'NT$ %1 / piece', 'NT$ %1 / 枚', 'NT$ %1 / 장'],
    ['^NT\\$ ([\\d,]+) / 組$', 'NT$ %1 / set', 'NT$ %1 / セット', 'NT$ %1 / 세트'],
    ['^NT\\$ ([\\d,]+)／張$', 'NT$ %1 / piece', 'NT$ %1／枚', 'NT$ %1／장'],
    ['^已加入 (\\d+) 個項目$', 'Items added: %1', '追加済み：%1件', '추가된 항목: %1개'],
    ['^已載入項目：(.+) \\(\\$([\\d,.]+)\\)$', 'Loaded: {1} ($%2)', '読み込みました：{1}（$%2）', '불러옴: {1} ($%2)'],
    ['^已加購：(.+) \\(\\+\\$([\\d,.]+)\\)$', 'Added: {1} (+$%2)', '追加しました：{1}（+$%2）', '추가함: {1} (+$%2)'],
    ['^已加入結算單：(.+)$', 'Added to receipt: {1}', 'お見積書に追加しました：{1}', '견적서에 추가함: {1}'],
    ['^底價: (.+)$', 'Base price: %1', '基本料金: %1', '기본 가격: %1'],
    ['^加價細項 \\(\\+(.+)\\)：$', 'Add-on (+{1}): ', '追加項目（+{1}）：', '추가 항목 (+{1}): '],
    ['^\\+ (.+)$', '+ {1}', '+ {1}', '+ {1}'],
    ['^\\+(\\d+(?:~\\d+)?) (.+)$', '+%1 {2}', '+%1 {2}', '+%1 {2}'],
    ['^(.+) - (.+)$', '{1} - {2}', '{1} - {2}', '{1} - {2}']
  ];

  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }

  var DICT = Object.create(null);
  D.forEach(function (d) { DICT[d[0].split('\n').map(norm).join('\n')] = d; });
  var PAT = P.map(function (p) { return { re: new RegExp(p[0]), row: p }; });

  function tr(s, l) {
    var core = norm(s), r = DICT[core], i, m, tpl;
    if (r && r[IDX[l]] != null) return r[IDX[l]];
    for (i = 0; i < PAT.length; i++) {
      m = PAT[i].re.exec(core);
      if (m) {
        tpl = PAT[i].row[IDX[l]];
        return tpl.replace(/\{(\d)\}|%(\d)/g, function (_, a, b) {
          if (a) { var x = tr(m[a], l); return x == null ? m[a] : x; }
          return m[b];
        });
      }
    }
    return null;
  }

  if (typeof document === 'undefined') {
    if (typeof module !== 'undefined') module.exports = { DICT: DICT, PAT: PAT, tr: tr, norm: norm };
    return;
  }

  var lang = DEFAULT_LANG, origHtmlLang = '';
  var TX = new WeakMap(), AT = new WeakMap(), obs = null, koFont = false;
  var ATTRS = ['alt', 'title', 'placeholder', 'aria-label'];
  var LANG_BY = {};
  LANGS.forEach(function (x) { LANG_BY[x.code] = x; });
  var SKIP_TAGS = /^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT)$/;

  function skip(el) {
    return SKIP_TAGS.test(el.nodeName) || !!(el.closest && el.closest('[data-no-i18n]'));
  }

  function splitWs(s) {
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
    return { a: m[1], core: m[2], b: m[3] };
  }

  function doText(node) {
    var p = node.parentNode;
    if (p && p.nodeType === 1) {
      for (var c = p.firstChild; c; c = c.nextSibling) {
        if (c.nodeName === 'BR') { if (doLines(p)) return; break; }
      }
    }
    var v = node.nodeValue, e = TX.get(node), orig = (e && v === e.applied) ? e.orig : v;
    var w = splitWs(orig);
    if (!w.core) return;
    var out = lang === 'zh' ? null : tr(w.core, lang);
    var nv = out == null ? orig : w.a + out + w.b;
    if (nv !== v) node.nodeValue = nv;
    if (nv !== orig || e) TX.set(node, { orig: orig, applied: nv });
  }

  function doLines(p) {
    var tn = [], c;
    for (c = p.firstChild; c; c = c.nextSibling) {
      if (c.nodeType === 3) tn.push(c);
      else if (c.nodeName !== 'BR') return false;
    }
    if (tn.length < 2) return false;
    var origs = tn.map(function (n) { var e = TX.get(n); return (e && n.nodeValue === e.applied) ? e.orig : n.nodeValue; });
    var row = lang === 'zh' ? null : DICT[origs.map(norm).join('\n')];
    var out = row && row[IDX[lang]];
    if (out == null) return false;
    var parts = out.split('\n');
    if (parts.length !== tn.length) return false;
    tn.forEach(function (n, i) {
      var w = splitWs(origs[i]), nv = w.a + parts[i] + w.b;
      if (n.nodeValue !== nv) n.nodeValue = nv;
      TX.set(n, { orig: origs[i], applied: nv });
    });
    return true;
  }

  function doAttr(el, attr) {
    var v = el.getAttribute(attr);
    if (v == null) return;
    var rec = AT.get(el);
    if (!rec) { rec = {}; AT.set(el, rec); }
    var e = rec[attr], orig = (e && v === e.applied) ? e.orig : v;
    var out = lang === 'zh' ? null : tr(orig, lang);
    var nv = out == null ? orig : out;
    if (nv !== v) el.setAttribute(attr, nv);
    rec[attr] = { orig: orig, applied: nv };
  }

  function walk(root) {
    var i, j, els, n;
    if (root.nodeType === 3) {
      if (root.parentNode && !skip(root.parentNode)) doText(root);
      return;
    }
    if (root.nodeType !== 1 || skip(root)) return;
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    while ((n = tw.nextNode())) { if (n.parentNode && !skip(n.parentNode)) doText(n); }
    els = [root].concat([].slice.call(root.querySelectorAll('[alt],[title],[placeholder],[aria-label]')));
    for (i = 0; i < els.length; i++) {
      if (skip(els[i])) continue;
      for (j = 0; j < ATTRS.length; j++) doAttr(els[i], ATTRS[j]);
    }
  }

  function applyAll() {
    if (document.body) walk(document.body);
    var t = document.querySelector('title');
    if (t && t.firstChild) doText(t.firstChild);
    var md = document.querySelector('meta[name="description"]');
    if (md) doAttr(md, 'content');
  }

  function handle(r) {
    var i;
    if (r.type === 'childList') {
      for (i = 0; i < r.addedNodes.length; i++) walk(r.addedNodes[i]);
    } else if (r.type === 'characterData') {
      if (r.target.parentNode && !skip(r.target.parentNode)) doText(r.target);
    } else if (r.type === 'attributes') {
      if (!skip(r.target)) doAttr(r.target, r.attributeName);
    }
  }

  function startObs() {
    if (!obs && 'MutationObserver' in window) {
      obs = new MutationObserver(function (recs) {
        if (lang === 'zh') return;
        recs.forEach(handle);
        obs.takeRecords();
      });
    }
    if (obs && document.body) {
      obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    }
  }

  function loadKoFont() {
    if (koFont) return;
    koFont = true;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap';
    document.head.appendChild(l);
  }

  function readStore() { try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; } }
  function writeStore(v) { try { localStorage.setItem(STORE_KEY, v); } catch (e) {} }

  function setLang(l, save) {
    if (!LANG_BY[l]) l = DEFAULT_LANG;
    lang = l;
    if (save !== false) writeStore(l);
    document.documentElement.lang = l === 'zh' ? (origHtmlLang || 'zh-Hant') : LANG_BY[l].html;
    if (l === 'ko') loadKoFont();
    if (obs) obs.disconnect();
    applyAll();
    startObs();
    updateUI();
    try { document.dispatchEvent(new CustomEvent('jess-lang-change', { detail: { lang: l } })); } catch (e) {}
  }

  /* ========== 語言按鈕 ========== */
  var ui = null;

  function injectStyle() {
    var css =
      '.jl{position:relative;display:inline-block;flex:none;font-family:inherit}' +
      '.jl-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border:var(--edge,1.5px solid #5A2E3E);border-radius:999px;background:#fff;color:var(--cocoa,#5A2E3E);font:inherit;font-weight:700;font-size:.9rem;line-height:1.4;cursor:pointer;box-shadow:var(--soft,0 3px 0 rgba(90,46,62,.2));white-space:nowrap}' +
      '.jl-btn:hover{background:#FFF1F4}' +
      '.jl-btn svg{width:16px;height:16px;flex:none}' +
      '.jl-menu{position:absolute;right:0;top:calc(100% + 8px);z-index:300;min-width:140px;margin:0;padding:6px;list-style:none;background:#fff;border:var(--edge,1.5px solid #5A2E3E);border-radius:16px;box-shadow:var(--soft,0 3px 0 rgba(90,46,62,.2))}' +
      '.jl-menu[hidden]{display:none}' +
      '.jl-menu li{margin:0;padding:0;list-style:none}' +
      '.jl-menu button{display:block;width:100%;padding:8px 12px;border:0;border-radius:10px;background:none;color:var(--cocoa,#5A2E3E);font:inherit;text-align:left;cursor:pointer}' +
      '.jl-menu button:hover{background:#FFF1F4}' +
      '.jl-menu button[aria-current="true"]{background:#FFE0E8;font-weight:700}' +
      '.jl.jl-float{position:fixed;left:16px;bottom:16px;z-index:300;margin:0}' +
      '.jl.jl-float .jl-menu{right:auto;left:0;top:auto;bottom:calc(100% + 8px)}' +
      'html[lang="ko"] :where(body,button,input,select,textarea){font-family:"Zen Maru Gothic","Noto Sans KR","Malgun Gothic","Apple SD Gothic Neo",sans-serif}';
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
  }

  function buildUI() {
    injectStyle();
    var wrap = document.createElement('div');
    wrap.className = 'jl';
    wrap.setAttribute('data-no-i18n', '');

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'jl-btn';
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Language');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/></svg><span class="jl-cur"></span>';

    var menu = document.createElement('ul');
    menu.className = 'jl-menu';
    menu.hidden = true;
    LANGS.forEach(function (x) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.dataset.l = x.code;
      b.setAttribute('lang', x.html);
      b.textContent = x.label;
      li.appendChild(b);
      menu.appendChild(li);
    });

    function close() { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
      btn.setAttribute('aria-expanded', String(!menu.hidden));
    });
    menu.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button[data-l]');
      if (!b) return;
      setLang(b.dataset.l);
      close();
      btn.focus();
    });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    wrap.appendChild(btn);
    wrap.appendChild(menu);

    var nav = document.querySelector('header nav');
    if (nav && !FLOATING) {
      var calcBtn = nav.querySelector('.btn');
      if (calcBtn) {
        var actionWrap = document.createElement('div');
        actionWrap.className = 'nav-actions';
        actionWrap.style.cssText = 'display:flex; align-items:center; gap:12px; margin-left:auto;';
        var ul = nav.querySelector('ul');
        if (ul) ul.style.marginRight = 'auto';
        calcBtn.parentNode.insertBefore(actionWrap, calcBtn);
        actionWrap.appendChild(calcBtn);
        actionWrap.appendChild(wrap);
      } else {
        wrap.style.marginLeft = 'auto';
        nav.appendChild(wrap);
      }
    } else {
      wrap.classList.add('jl-float');
      document.body.appendChild(wrap);
    }
    ui = { wrap: wrap, btn: btn, menu: menu };
    updateUI();
  }

  function updateUI() {
    if (!ui) return;
    ui.btn.querySelector('.jl-cur').textContent = LANG_BY[lang].label;
    [].forEach.call(ui.menu.querySelectorAll('button'), function (b) {
      b.setAttribute('aria-current', String(b.dataset.l === lang));
    });
  }

  function pickInitial() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    if (q && LANG_BY[q]) return q;
    var s = readStore();
    if (s && LANG_BY[s]) return s;
    if (AUTO_DETECT) {
      var n = String(navigator.language || '').toLowerCase();
      if (n.indexOf('ko') === 0) return 'ko';
      if (n.indexOf('ja') === 0) return 'ja';
      if (n.indexOf('en') === 0) return 'en';
    }
    return DEFAULT_LANG;
  }

  function init() {
    origHtmlLang = document.documentElement.lang || 'zh-Hant';
    buildUI();
    setLang(pickInitial(), false);
  }

  window.JessI18n = {
    t: function (s) {
      if (lang === 'zh') return s;
      var r = tr(s, lang);
      return r == null ? s : r;
    },
    setLang: setLang,
    get lang() { return lang; }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();