export const siteConfig = {
  orderingUrl: 'https://tsunami-wange.github.io/qie-coffee/',
  brand: 'Qie.Coffee',
  dimensions: { width: 14, depth: 12, height: 4.6 }, // gross footprint 168 m²; usable concept area ≈150 m²
  palette: { brick:'#743c36', wood:'#42251f', cream:'#e8dfca', green:'#19362e', gold:'#b98b50', red:'#722f3a' },
};

export type AreaId = 'exterior'|'entrance'|'stage'|'seating'|'lab'|'mix'|'culture'|'retail'|'overview';
export const areas: {id:AreaId; zh:string; en:string; position:[number,number,number]; target:[number,number,number]}[] = [
 {id:'exterior',zh:'石库门门头',en:'The Shikumen',position:[0,3.1,17.8],target:[0,2.3,5.2]},
 {id:'entrance',zh:'入口大厅',en:'Entrance Hall',position:[0,1.7,3.8],target:[0,1.7,-2.5]},
 {id:'stage',zh:'剧院主舞台',en:'Qie.Stage',position:[0,1.8,-0.4],target:[0,1.7,-5.2]},
 {id:'seating',zh:'海派下午茶',en:'Afternoon Tea',position:[-4.3,1.65,0.7],target:[-1.5,1.1,-2.7]},
 {id:'lab',zh:'喫怪实验室',en:'Qie.Lab',position:[-4.3,1.8,-2.6],target:[-5.5,1.7,-4.6]},
 {id:'mix',zh:'万般随侬',en:'Qie.Mix',position:[3.8,1.8,-1.5],target:[5.3,1.45,-4.15]},
 {id:'culture',zh:'海派文化区',en:'Shanghai Stories',position:[-4.5,1.7,3.5],target:[-6.3,1.7,1.2]},
 {id:'retail',zh:'文创商店',en:'Theatre Shop',position:[3.9,2.05,4.7],target:[6.05,2.02,3.25]},
 {id:'overview',zh:'整体俯瞰',en:'Bird’s-eye View',position:[0,15,5.5],target:[0,0,0]},
];

export type Info = {title:string; en:string; detail:string; detailEn:string; price?:string; images?:string[]};
export const content: Record<string,Info> = {
 door:{title:'石库门 · 剧场开场',en:'The Shikumen Entrance',detail:'厚重红木门、砖墙与石材门楣，借鉴上海石库门建筑语言。点击“进入门店”开启体验。',detailEn:'Mahogany doors, brick and a stone pediment reinterpret Shanghai Shikumen architecture.'},
 poster:{title:'本月风味演出',en:'This Month at Qie.Lab',detail:'酒酿圆子云朵咖啡：以江南酒酿与软糯圆子，重写一杯拿铁的尾韵。课程项目概念产品。',detailEn:'Sweet rice ferment and glutinous rice balls give this conceptual latte a Jiangnan finish.',price:'¥42',images:['./images/rice-cloud-poster.jpg']},
 curtain:{title:'QIE.STAGE',en:'Every Cup Is a Performance',detail:'咖啡师在小型剧场般的吧台里完成每一杯风味演出。点击幕布可开合。',detailEn:'A compact theatre turns coffee making into a visible performance. Click the curtain to open or close it.'},
 machine:{title:'舞台上的咖啡机',en:'The Espresso Machine',detail:'吧台后方保留专业操作区；顾客在前方观赏与交流。',detailEn:'The professional work zone remains behind the counter while guests watch from the front.'},
 seat:{title:'海派下午茶',en:'Shanghai Afternoon Tea',detail:'配套墨绿皮质沙发、软包扶手、拉扣靠背与红木圆桌构成松弛的观演席。',detailEn:'Matching green leather sofas, upholstered arms, buttoned backs and mahogany tables create relaxed theatre seating.'},
 gramophone:{title:'留声机',en:'Gramophone',detail:'留声机是近现代都市生活的一个视觉意象。此处用于表达海派空间的新旧交融，并非特定历史事件的复原。',detailEn:'The gramophone evokes modern urban life. Here it is a design metaphor, not a reconstruction of a specific historical event.'},
 map:{title:'中国咖啡风土',en:'Coffee of China',detail:'云南是中国重要的咖啡产区。品牌以中国风土为创意起点，搭配上海的当代咖啡表达。',detailEn:'Yunnan is a major coffee growing region in China. Its terroir inspires the brand’s Shanghai-made creations.'},
 glass:{title:'花纹玻璃隔断',en:'Floral Glass Screen',detail:'圆形花卉纹样与长虹玻璃取材于海派室内语言，构成入口与店内的透光界面。',detailEn:'Floral geometry and ribbed glass create a translucent threshold.'},
 gift:{title:'上海咖啡剧场礼盒',en:'Shanghai Coffee Theatre Gift Set',detail:'剧场入场券、咖啡与海派点心组成的概念礼盒。切换图片查看礼盒与演出凭证。',detailEn:'A conceptual gift set with theatre admission, coffee and Shanghai pastries. Switch images to see the set and its programme.',images:['./images/theatre-gift-set.jpg','./images/theatre-diy-set.jpg']},
 sound:{title:'声音体验接口',en:'Sound Experience',detail:'当前没有可授权使用的环境音频，因此音效尚未接入。将来可在用户主动点击后启用。',detailEn:'No licensed ambient audio is connected. Sound can be enabled after a visitor actively opts in.'},
};

export const products: Info[] = [
 {title:'葱油拌面拿铁',en:'Scallion Noodle Latte',detail:'葱油香气与奶咖相遇，取意上海日常面食。概念配方。',detailEn:'Scallion aroma meets milk coffee, inspired by a Shanghai staple.',price:'¥36'},
 {title:'蝴蝶酥碎碎拿铁',en:'Palmier Crumble Latte',detail:'以蝴蝶酥的焦香与酥脆重构咖啡甜点。概念配方。',detailEn:'Buttery palmier crumble turns the latte into dessert.',price:'¥38',images:['./images/palmier-poster.jpg']},
 {title:'酒酿圆子云朵咖啡',en:'Rice Cloud Coffee',detail:'江南酒酿与糯圆子融入咖啡。概念配方。',detailEn:'Sweet rice ferment and rice balls meet coffee.',price:'¥42',images:['./images/rice-cloud-poster.jpg']},
 {title:'上海八宝咖啡',en:'Eight-Treasure Chinese Latte',detail:'桂花、芝麻麻糍、红豆与血糯米融入奶咖，呈现中式八宝甜品的层次。概念配方。',detailEn:'Osmanthus, sesame mochi, red bean and black glutinous rice layer into a latte. A conceptual recipe.',price:'¥55',images:['./images/eight-treasure-poster.jpg']},
 {title:'花椒黑巧咖啡',en:'Pepper & Dark Chocolate',detail:'花椒的轻麻与黑巧的浓郁形成对比。概念配方。',detailEn:'A light Sichuan pepper tingle meets dark chocolate.',price:'¥39'},
 {title:'陈醋山楂气泡咖啡',en:'Hawthorn Sparkling Coffee',detail:'山楂果酸与陈醋层次带来清爽风味。概念配方。',detailEn:'Hawthorn fruit and aged vinegar make a bright sparkling coffee.',price:'¥36'},
 {title:'鲜肉月饼风味咸奶咖',en:'Savory Mooncake Coffee',detail:'借用上海鲜肉月饼的咸香记忆，构思一款咸奶咖。概念配方。',detailEn:'A savory milk coffee inspired by Shanghai pork mooncakes.',price:'¥39'},
 {title:'海派栗子蛋糕咖啡',en:'Chestnut Cake Coffee',detail:'栗子、奶油与咖啡层叠，呼应海派西点。概念配方。',detailEn:'Chestnut and cream layer with coffee, echoing Shanghai patisserie.',price:'¥39'},
 {title:'老上海奶糖脆皮咖啡',en:'Milk Candy Crunch Coffee',detail:'以奶糖香和脆皮口感演绎城市甜味记忆。概念配方。',detailEn:'Milk candy aroma and a crisp shell evoke nostalgic city sweets.',price:'¥38'},
 {title:'红腐乳咸奶咖',en:'Fermented Tofu Cream Coffee',detail:'以红腐乳的咸鲜作为实验性风味点缀。概念配方。',detailEn:'A small accent of fermented tofu adds savory umami.',price:'¥39'},
];
export const ingredients: Info[] = [
 {title:'桂花',en:'Osmanthus',detail:'江南常见花香，清甜轻盈。点击加入你的 Qie.Mix 配方。',detailEn:'A delicate floral note familiar across Jiangnan. Add it to your Qie.Mix recipe.',images:['./images/osmanthus-display.jpg']},
 {title:'龙井',en:'Longjing Tea',detail:'浙江绿茶，带有清新的焙炒与豆香。',detailEn:'Zhejiang green tea with fresh toasted notes.'},
 {title:'黑芝麻',en:'Black Sesame',detail:'中式甜点常用食材，醇厚坚果香。',detailEn:'A rich, nutty staple in Chinese sweets.'},
 {title:'山楂',en:'Hawthorn',detail:'鲜明果酸，为咖啡带来活泼尾韵。',detailEn:'Bright fruit acidity for a lively finish.'},
 {title:'陈皮',en:'Dried Tangerine Peel',detail:'柑橘香与微苦层次。',detailEn:'Aromatic citrus with a gentle bitter edge.'},
];
