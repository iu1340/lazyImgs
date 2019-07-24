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
    /**
    let windowHeight = window.innerHeight
    let position = el.getBoundingClientRect()
    // 当元素的top偏移量小于页面大小并且大于高度的负数
    if(position.top<windowHeight && position.top>-position.height){
      return true
    }
    return false
    **/
    let position = el.getBoundingClientRect();
    // console.log(parentPosition)
    // let half = position.width / 2;
    if (!parent) {
        parent = window;
        return (position.top < parent.innerHeight && position.bottom > 0) &&
            (position.left < parent.innerWidth && position.right > 0);
    } else {
        let parentPosition = parent.getBoundingClientRect();
        return (position.top < parentPosition.bottom && position.top >= parentPosition.top) &&
            (position.left < (parentPosition.right) && position.left >= parentPosition.left);
    }
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
        imgIndex = '' + new Date().getTime() + Math.random() * 100;
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

                if(parent){
                    //parent = el.parentNode;
                    parent.addEventListener('scroll', () => {
                        lazyLoad(el, binding.value, parent);
                    });
                }
                
                
                window.addEventListener('scroll', function () {
                    lazyLoad(el, binding.value, parent);
                }, true);

                // lazyLoad(el);
            },
            update: function (el, binding, vnode) {
                let parentName = el.getAttribute('parent');
                let parent = document.querySelector(parentName);
                lazyLoad(el, binding.value, parent);
            }
        });
    }
};