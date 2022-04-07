// How to run this test script
// 
// $ node ./News.test.js

const { getFeedURL } = require("./News")

function TestGetFeedURL() {
    const dummyUrlMap = {
        dummySite1: "dummyURL1",
        dummySite2: {
            dummySite2: "dummyURL2",
            dummyCategory1: "dummyURL2-1",
            dummyCategory2: "dummyURL2-2",
        },
    }

    const cases = [
        {
            name: "正常系: サイト名とURLの対",
            input: {
                subcommandName: "dummySite1",
                categoryName: "",
            },
            expected: {
                feedURL: "dummyURL1",
            },
        },
        {
            name: "正常系: カテゴリがある場合 サイト名とカテゴリ名が同じ場合",
            input: {
                subcommandName: "dummySite2",
                categoryName: "dummySite2",
            },
            expected: {
                feedURL: "dummyURL2",
            },
        },
        {
            name: "正常系: カテゴリがある場合 サイト名とカテゴリ名が別の場合",
            input: {
                subcommandName: "dummySite2",
                categoryName: "dummyCategory1",
            },
            expected: {
                feedURL: "dummyURL2-1",
            },
        },
        {
            name: "異常系: 存在しないサイト名の場合",
            input: {
                subcommandName: "invalidSiteName",
                categoryName: "dummyCategory1",
            },
            expected: {
                feedURL: "",
            },
        },
        {
            name: "異常系: 存在しないカテゴリ名の場合",
            input: {
                subcommandName: "dummySite2",
                categoryName: "invalidCategory",
            },
            expected: {
                feedURL: "dummyURL2",
            },
        },
    ]

    for (const i in cases) {
        const c = cases[i]
        console.log(`[test] ${c.name}`)

        const mockInteraction = {
            options: {
                getSubcommand() {
                    return c.input.subcommandName
                },
                getString(name) {
                    if (name == "category") {
                        return c.input.categoryName
                    }
                    console.log(`\t[fail] unexpected category name: ${name}`)
                    return "invalidCategoryName"
                },
            },
        }

        const actual = getFeedURL(dummyUrlMap, mockInteraction)

        if (actual == c.expected.feedURL) {
            console.log("\t[pass]")
        } else {
            console.log("\t[fail] unexpected output")
            console.log(`\texpected: ${c.expected.feedURL}`)
            console.log(`\tactual: ${actual}`)
        }
    }
}

TestGetFeedURL()
