document.addEventListener('DOMContentLoaded', (event) => {
    const links = document.querySelectorAll("#lnav > li > a");
    for(let link of links) {
        link.addEventListener("click", e => {
            updateNav(link.parentNode);

            document.getElementById(link.href.split('#')[1]).scrollIntoView(true);
            e.preventDefault();
            e.stopPropagation();
        });
    }

    function notActive()
    {
        const links = document.querySelectorAll("#lnav li");
        for(let link of links) {
            link.classList.remove('bg-gray-300', 'rounded', 'text-gray-800');
            link.classList.add('text-gray-600', 'hover:text-gray-800');
        }
    }

    function updateNav(active)
    {
        notActive();

        active.classList.add('bg-gray-300', 'rounded', 'text-gray-800');
        active.classList.remove('text-gray-600', 'hover:text-gray-800');
    }

    window.addEventListener('scroll', debounce(e => {
        let headers = [...document.querySelectorAll("h2")];
        let links = [...document.querySelectorAll("#lnav li")];


        let tops = headers.map(el => {
            let viewportOffset = el.getBoundingClientRect();
            let top = viewportOffset.top;
            return top;
        })

        if (tops[0] > 0) {
            updateNav(links[0]);
            return;
        }

        for(const [i, elemTop] of tops.entries()) {
            if(typeof tops[i + 1] === 'undefined') {
                updateNav(links[i]);
                return;
            }
            let next = tops[i + 1];
            if (elemTop <= 0 && elemTop < next && next > 0) {
                updateNav(links[i]);
                return;
            }
        }
    }, 200));
})

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
