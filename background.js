document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('#form')
    form.addEventListener('submit', function (event) {
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);
        const input = formProps.item;
        browser.tabs.query({ url: "*://*.traderjoes.com/*" }).then((tabs) => {
            // trader joe's 'chocolate milk' -> 'chocolate+milk'
            const queryParams = input.replace(/ /g, "+")
            const url = `https://www.traderjoes.com/home/search?q=${queryParams}`
            navigate(tabs, url)
        })

        browser.tabs.query({ url: "*://*.safeway.com/*" }).then((tabs) => {
            // Safeway takes the raw input
            const url = `https://www.safeway.com/shop/search-results.html?q=${input}`
            navigate(tabs, url)
        })

        browser.tabs.query({ url: "*://*.qfc.com/*" }).then((tabs) => {
            // QFC takes the raw input
            const url = `https://www.qfc.com/search?query=${input}`
            navigate(tabs, url)
        })

        browser.tabs.query({ url: "*://*.wholefoodsmarket.com/*" }).then((tabs) => {
            // Whole foods 'chocolate milk' -> 'chocolate+milk'
            const queryParams = input.replace(/ /g, "+")
            const url = `https://www.wholefoodsmarket.com/search?text=${queryParams}`
            navigate(tabs, url)
        })
    })
})

function navigate(tabs, url) {
    if (tabs.length == 0) {
        browser.tabs.create({
            url: url,
        });
    } else {
        let ids = tabs.map((tab) => tab.id);
        const [, ...allButFirst] = ids;
        browser.tabs.remove(allButFirst);
        browser.tabs.update(ids[0], {
            url: url
        })
    }
}