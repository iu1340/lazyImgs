/**
 * @file lazy imgs
 */
let timers = {};

/**
 * 函数防抖，用户停止操作后触发
 * @param {number} index
 * @param {function} fn
 */
function debounce(index, fn) {
    // 函数防抖：用户停止操作之后触发
    clearTimeout(timers[index]);
    timers[index] = setTimeout(() => {
        fn();
    }, 200);
}

/**
 * 判断元素可见
 * @param {element} el
 * @param {element} parent
 * @return boolean
 */
function isVisible(el, parent) {
    let position = el.getBoundingClientRect();
    if (!parent) {
        parent = window;
        return (position.top < parent.innerHeight && position.bottom > 0) &&
            (position.left < parent.innerWidth && position.right > 0);
    } else {
        let parentPosition = parent.getBoundingClientRect();
        return ((position.top < parentPosition.bottom && position.top >= parentPosition.top)||(position.bottom < parentPosition.bottom && position.bottom >= parentPosition.top)) &&
            ((position.left < (parentPosition.right) && position.left >= parentPosition.left)||(position.right < (parentPosition.right) && position.right >= parentPosition.left));
    }
}

/**
 * 生成唯一ID
 */
function guid() {
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

/**
 * 对图片进行懒加载
 * @param {element} img
 * @param {string} src
 * @param {element} parent
 */
function lazyLoad(img, src, parent) {
    let imgIndex = img.getAttribute('img-index');
    let status = img.getAttribute('status');
    if (!imgIndex) {
        imgIndex = guid();
        img.setAttribute('img-index', imgIndex);
    }
    if (status === 'loading') {
        debounce(imgIndex, function () {
            if (img && src && isVisible(img, parent)) { // 元素存在，元素未被加载，元素可见
                img.setAttribute('status', 'loaded');
                img.setAttribute('src', src);
            }
        });
    }
}

export default {
    install(Vue, options) {
        Vue.directive('lazy', {
            bind: function (el, binding, vnode) {
                if (options) {
                    el.setAttribute('src', options.loading);
                }
                el.setAttribute('data-src', binding.value);
                el.setAttribute('status', 'loading');
                // 监听element，现用update替换
                // observer.observe(el, { attributes : true, attributeFilter : ['style'] });
            },
            inserted: function (el, binding, vnode) {
                let parentName = el.getAttribute('parent');
                let parent = document.querySelector(parentName);

                if (parent) {
                    //parent = el.parentNode;
                    parent.addEventListener('scroll', () => {
                        lazyLoad(el, binding.value, parent);
                    });
                }


                window.addEventListener('scroll', function () {
                    lazyLoad(el, binding.value, parent);
                }, true);

                lazyLoad(el, binding.value, parent);
            },
            update: function (el, binding, vnode) {
                let parentName = el.getAttribute('parent');
                let parent = document.querySelector(parentName);
                lazyLoad(el, binding.value, parent);
            }
        });
    }
};