let Parser = require('rss-parser');
let parser = new Parser()
let Discord = require('discord.js');
module.exports = {
    data: {
        name: "news",
        description: "Submit news from tech media",
        options: [
            {
                type: "SUB_COMMAND",
                name: "gizmodo",
                description: "Gizmodo",
            },
            {
                type: "SUB_COMMAND",
                name: "impress_watch",
                description: "Impress Watch",
                options:[{
                    type: "STRING",
                    name: "category",
                    description: "select category",
                    choices: [
                        { name: "Impress Watch", value: "impress_watch" },
                        { name: "PC Watch", value: "pc_watch" },
                        { name: "ケータイWatch", value: "keitai_watch"},
                        { name: "AV Watch", value: "av_watch"},
                    ]
                }]
            },
            {
                type: "SUB_COMMAND",
                name: "ascii",
                description: "ASCII.jp",
                options:[{
                    type: "STRING",
                    name: "category",
                    description: "select media",
                    choices: [
                        { name: "ascii", value: "ascii"},
                        { name: "デジタル", value: "digital" },
                        { name: "iPhone/Mac", value: "iphone_mac" },
                    ]
                }]
            },
            {
                type: "SUB_COMMAND",
                name: "gigazine",
                description: "Gigazine",
                options:[{
                    type: "STRING",
                    name: "category",
                    description: "select category",
                    choices: [
                        { name: "gigazine", value:"gigazine"},
                        { name: "モバイル", value: "gigazine_mobile" },
                        { name: "ハードウェア", value: "hardware" },
                        { name: "ソフトウェア", value: "software" },
                    ]
                }]
            },
            {
                type: "SUB_COMMAND",
                name: "itmedia",
                description: "ITmedia",
                options:[{
                    type: "STRING",
                    name: "category",
                    description: "select category",
                    choices: [
                        { name: "ITmedia", value: "itmedia" },
                        { name: "製品動向", value: "product_trends" },
                        { name: "ITmedia mobile", value: "itmedia_mobile"},
                    ]
                }]
            },
        ],
    },
    async execute(interaction) {
        if (interaction.options.getSubcommand() == "gizmodo"){
            feed = await parser.parseURL('https://www.gizmodo.jp/index.xml')
        }else if (interaction.options.getSubcommand() == "impress_watch"){
            if (interaction.options.getString("category") == "impress_watch"){
                feed = await parser.parseURL('https://www.watch.impress.co.jp/data/rss/1.0/ipw/feed.rdf')
            }else if (interaction.options.getString("category") == "pc_watch"){
                feed = await parser.parseURL('https://pc.watch.impress.co.jp/data/rss/1.0/pcw/feed.rdf')
            }else if (interaction.options.getString("category") == "keitai_watch"){
                feed = await parser.parseURL("https://k-tai.watch.impress.co.jp/data/rss/1.0/ktw/feed.rdf")
            }else if (interaction.options.getString("category") == "av_watch"){
                feed = await parser.parseURL("https://av.watch.impress.co.jp/data/rss/1.0/avw/feed.rdf")
            }else{
                feed = await parser.parseURL('https://www.watch.impress.co.jp/data/rss/1.0/ipw/feed.rdf')
            }
        }else if (interaction.options.getSubcommand() == "ascii"){
            if (interaction.options.getString("category") == "digital"){
                feed = await parser.parseURL("https://ascii.jp/digital/rss.xml")
            }else if (interaction.options.getString("category") == "iphone_mac"){
                feed = await parser.parseURL("https://ascii.jp/mac/rss.xml")
            }else{
                feed = await parser.parseURL("https://ascii.jp/rss.xml")
            }
        }else if (interaction.options.getSubcommand() == "gigazine"){
            if (interaction.options.getString("category") == "gigazine_mobile"){
                feed = await parser.parseURL("https://news.google.com/rss/search?q=%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB+inurl:gigazine.net&hl=ja&gl=JP&ceid=JP:ja")
            }else if (interaction.options.getString("category") == "hardware"){
                feed = await parser.parseURL("https://news.google.com/rss/search?q=%E3%83%8F%E3%83%BC%E3%83%89%E3%82%A6%E3%82%A7%E3%82%A2+inurl:gigazine.net&hl=ja&gl=JP&ceid=JP:ja")
            }else if (interaction.options.getString("category") == "software"){
                feed = await parser.parseURL("https://news.google.com/rss/search?q=%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2+inurl:gigazine.net&hl=ja&gl=JP&ceid=JP:ja")
            }else{
                feed = await parser.parseURL("https://gigazine.net/news/rss_2.0/")
            }
        }else{
            if (interaction.options.getString("category") == "itmedia"){
                feed = await parser.parseURL("https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml")
            }else if (interaction.options.getString("category") == "product_trends"){
                feed = await parser.parseURL("https://rss.itmedia.co.jp/rss/2.0/news_products.xml")
            }else{
                feed = await parser.parseURL("https://rss.itmedia.co.jp/rss/2.0/mobile.xml")
            }
        }
        
        let descrip = []
        let content = ""
        for(var i=0; i < feed.items.length; i++){
            content = feed.items[i].contentSnippet
            if (String(content).length > 50) {
                content = content.substr(0, 50) + '...';
            }
            descrip.push(content)
        }
        let title = []
        let titles = ""
        for(var i=0; i < feed.items.length; i++){
            titles = feed.items[i].title
            if (String(titles).length > 35) {
                titles = titles.substr(0, 32) + '...';
            }
            title.push(titles)
        }
        var i = Math.floor( Math.random() * 3 );
        var adTitle = ["[ad]利用サーバー:lolipop", "このBotのソースコードはこちら", "協力してくださった方"]
        var addescrip = ["レンタルサーバー「ロリポップ！」月額220円からWordPressが使え、ワンクリック60秒で簡単インストール！", "GitHubはこちら", "こちらのBot作成に協力してくださった方はこちらです。"]
        var adlink = ["https://px.a8.net/svt/ejp?a8mat=3BSOG1+F8XOJ6+348+61RIB", "https://github.com/ice-hisa/DiscordTechNews", "https://note.com/ice_hisame/n/nfbd4f998bc4d"]

        var embed = new Discord.MessageEmbed()
            .setTitle(`${feed.title}`)
            .setURL(`${feed.link}`)
            .setDescription(`${feed.description}`)
            .addField('\u200B','\u200B');
        for ( var x = 0; x < feed.items.length; x++ ){
            embed = embed.addField( `${title[x]}`, `[${descrip[x]}](${feed.items[x].link})\n`,true );
        }
        embed = embed.addField( `${adTitle[i]}`, `[${addescrip[i]}](${adlink[i]})`,true );
        await interaction.reply({ embeds: [embed] });
	}
}