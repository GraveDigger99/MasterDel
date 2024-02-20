(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function functions_getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    function setHash(hash) {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        let tabsActiveHash = [];
        if (tabs.length > 0) {
            const hash = functions_getHash();
            if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
            tabs.forEach(((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                tabsBlock.addEventListener("click", setTabsAction);
                initTabs(tabsBlock);
            }));
            let mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
        }
        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach((tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems.forEach(((tabsContentItem, index) => {
                    if (matchMedia.matches) {
                        tabsContent.append(tabsTitleItems[index]);
                        tabsContent.append(tabsContentItem);
                        tabsMediaItem.classList.add("_tab-spoller");
                    } else {
                        tabsTitles.append(tabsTitleItems[index]);
                        tabsMediaItem.classList.remove("_tab-spoller");
                    }
                }));
            }));
        }
        function initTabs(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
            if (tabsActiveHashBlock) {
                const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
            }
            if (tabsContent.length) {
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    tabsTitles[index].setAttribute("data-tabs-title", "");
                    tabsContentItem.setAttribute("data-tabs-item", "");
                    if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                    tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                }));
            }
        }
        function setTabsStatus(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            function isTabsAnamate(tabsBlock) {
                if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
            const tabsBlockAnimate = isTabsAnamate(tabsBlock);
            if (tabsContent.length > 0) {
                const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    if (tabsTitles[index].classList.contains("_tab-active")) {
                        if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                        if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                    } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                }));
            }
        }
        function setTabsAction(e) {
            const el = e.target;
            if (el.closest("[data-tabs-title]")) {
                const tabTitle = el.closest("[data-tabs-title]");
                const tabsBlock = tabTitle.closest("[data-tabs]");
                if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                    let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                    tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                    tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                    tabTitle.classList.add("_tab-active");
                    setTabsStatus(tabsBlock);
                }
                e.preventDefault();
            }
        }
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    function formFieldsInit(options = {
        viewPass: false,
        autoHeight: false
    }) {
        const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
        if (formFields.length) formFields.forEach((formField => {
            if (!formField.hasAttribute("data-placeholder-nohide")) formField.dataset.placeholder = formField.placeholder;
        }));
        document.body.addEventListener("focusin", (function(e) {
            const targetElement = e.target;
            if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
                if (targetElement.dataset.placeholder) targetElement.placeholder = "";
                if (!targetElement.hasAttribute("data-no-focus-classes")) {
                    targetElement.classList.add("_form-focus");
                    targetElement.parentElement.classList.add("_form-focus");
                }
                formValidate.removeError(targetElement);
            }
        }));
        document.body.addEventListener("focusout", (function(e) {
            const targetElement = e.target;
            if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
                if (targetElement.dataset.placeholder) targetElement.placeholder = targetElement.dataset.placeholder;
                if (!targetElement.hasAttribute("data-no-focus-classes")) {
                    targetElement.classList.remove("_form-focus");
                    targetElement.parentElement.classList.remove("_form-focus");
                }
                if (targetElement.hasAttribute("data-validate")) formValidate.validateInput(targetElement);
            }
        }));
        if (options.viewPass) document.addEventListener("click", (function(e) {
            let targetElement = e.target;
            if (targetElement.closest('[class*="__viewpass"]')) {
                let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
                targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
                targetElement.classList.toggle("_viewpass-active");
            }
        }));
        if (options.autoHeight) {
            const textareas = document.querySelectorAll("textarea[data-autoheight]");
            if (textareas.length) {
                textareas.forEach((textarea => {
                    const startHeight = textarea.hasAttribute("data-autoheight-min") ? Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
                    const maxHeight = textarea.hasAttribute("data-autoheight-max") ? Number(textarea.dataset.autoheightMax) : 1 / 0;
                    setHeight(textarea, Math.min(startHeight, maxHeight));
                    textarea.addEventListener("input", (() => {
                        if (textarea.scrollHeight > startHeight) {
                            textarea.style.height = `auto`;
                            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
                        }
                    }));
                }));
                function setHeight(textarea, height) {
                    textarea.style.height = `${height}px`;
                }
            }
        }
    }
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if (formRequiredItem.dataset.required === "email") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll(".select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === "first") {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if (this.type === "min") arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    let isDoorsWrapperOpen = false;
    let isWindowsWrapperOpen = false;
    const blockCounters = {};
    const doorsWrapperButton = document.getElementById("doorsWrapperButton");
    const windowsWrapperButton = document.getElementById("windowsWrapperButton");
    if (windowsWrapperButton) windowsWrapperButton.addEventListener("click", (event => {
        event.preventDefault();
        addBlock("windows", "windowsWrapper", true);
    }));
    if (doorsWrapperButton) doorsWrapperButton.addEventListener("click", (event => {
        event.preventDefault();
        console.log("Clicked Doors Button");
        addBlock("doors", "doorsWrapper", true);
    }));
    function addBlock(blockType, wrapperId, isOpen) {
        if (!blockCounters[wrapperId]) blockCounters[wrapperId] = {};
        if (blockType === "doors" && isOpen) isDoorsWrapperOpen = true;
        if (blockType === "windows" && isOpen) isWindowsWrapperOpen = true;
        blockCounters[wrapperId][blockType] = (blockCounters[wrapperId][blockType] || 0) + 1;
        const blockCounter = getBlockCounter(blockType, wrapperId);
        const blockId = `${blockType}Block_${blockCounter}`;
        const translatedBlockType = getBlockTypeLabel(blockType);
        const inputClassWidth = `input_${blockType}-width${isOpen ? " input_number" : ""}`;
        const inputClassHeight = `input_${blockType}-height${isOpen ? " input_number" : ""}`;
        const closeBtn = isOpen ? `<button type="button" class="tabs__close tabs__close_${blockType}" id="${blockId}_closeBtn">\n        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">\n          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.41401 8.00001L12.707 4.70701C13.098 4.31601 13.098 3.68401 12.707 3.29301C12.316 2.90201 11.684 2.90201 11.293 3.29301L8.00001 6.58601L4.70701 3.29301C4.31601 2.90201 3.68401 2.90201 3.29301 3.29301C2.90201 3.68401 2.90201 4.31601 3.29301 4.70701L6.58601 8.00001L3.29301 11.293C2.90201 11.684 2.90201 12.316 3.29301 12.707C3.48801 12.902 3.74401 13 4.00001 13C4.25601 13 4.51201 12.902 4.70701 12.707L8.00001 9.41401L11.293 12.707C11.488 12.902 11.744 13 12 13C12.256 13 12.512 12.902 12.707 12.707C13.098 12.316 13.098 11.684 12.707 11.293L9.41401 8.00001Z" fill="#8B93A5"/>\n        </svg>\n      </button>` : "";
        const newBlock = `\n    <div class="tabs__inner tabs__inner_${blockType}" id="${blockId}">\n      <div class="tabs__header">\n        <h3 data-row class="tabs__topic">${getTopicLabel(translatedBlockType)} #${blockCounter}</h3>\n        ${closeBtn}\n      </div>\n      <div class="tabs__form form-tabs">\n        <div class="form-tabs__line">\n          <label for="${blockId}_input4" class="form-tabs__label">Ширина ${translatedBlockType}</label>\n          <div class="form-tabs__wrapper">\n            <input id="${blockId}_input4" type="string" class="form-tabs__input input input_number ${inputClassWidth}" placeholder="0">\n            <span class="form-tabs__measurement">метры (м)</span>\n          </div>\n        </div>\n        <div class="form-tabs__line">\n          <label for="${blockId}_input5" class="form-tabs__label">Высота ${translatedBlockType}</label>\n          <div class="form-tabs__wrapper">\n            <input id="${blockId}_input5" type="string" class="form-tabs__input input input_number ${inputClassHeight}" placeholder="0">\n            <span class="form-tabs__measurement">метры (м)</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  `;
        const blockWrapper = document.getElementById(wrapperId);
        if (blockWrapper) blockWrapper.insertAdjacentHTML("beforeend", newBlock);
        if (isOpen) {
            const closeBtn = document.getElementById(`${blockId}_closeBtn`);
            if (closeBtn) closeBtn.addEventListener("click", (function() {
                removeBlock(blockType, blockId, wrapperId);
            }));
        }
        updateSerialNumbers(blockType, wrapperId);
    }
    function getBlockTypeLabel(blockType) {
        switch (blockType) {
          case "doors":
            return "двери";

          case "windows":
            return "окна";

          case "bathrooms":
            return "Ванны";

          default:
            return "";
        }
    }
    function getTopicLabel(translatedBlockType) {
        switch (translatedBlockType) {
          case "двери":
            return "Двери";

          case "окна":
            return "Окна";

          case "bathroom":
            return "1";

          default:
            return translatedBlockType;
        }
    }
    function removeBlock(blockType, blockId, wrapperId) {
        const block = document.getElementById(blockId);
        block.parentNode.removeChild(block);
        updateSerialNumbers(blockType, wrapperId);
    }
    function updateSerialNumbers(blockType, wrapperId) {
        const blocks = document.querySelectorAll(`#${wrapperId} .tabs__inner_${blockType}`);
        blocks.forEach(((block, index) => {
            const topic = block.querySelector(".tabs__topic");
            topic.textContent = `${getTopicLabel(getBlockTypeLabel(blockType))} #${index + 1}`;
        }));
    }
    function getBlockCounter(blockType, wrapperId) {
        return blockCounters[wrapperId][blockType] || 0;
    }
    function setupCalculation(className, calculationLabel, surfaceClass, lengthClass, widthClass, heightClass) {
        const calculateBtn = document.querySelector(`.${className}`);
        const resultsItemsWrapper = document.querySelector(".result__items");
        const resultDefault = document.querySelector(".result__default");
        const resultBody = document.querySelector(".result__body");
        const tabButtons = document.querySelectorAll("[data-tabs-titles] button");
        function resetResultDisplay() {
            resultsItemsWrapper.innerHTML = "";
            resultDefault.style.display = "block";
            resultBody.style.display = "none";
        }
        function getInputValues() {
            const widthOfSurface = document.querySelector(`.${surfaceClass}`).value;
            const surfaceLengthHeight = document.querySelector(`.${lengthClass}`).value;
            const widthOfPlasterBoard = document.querySelector(`.${widthClass}`).value;
            const heightOfPlasterBoard = document.querySelector(`.${heightClass}`).value;
            if (!widthOfSurface || !surfaceLengthHeight || !widthOfPlasterBoard || !heightOfPlasterBoard) {
                handleInputValidation();
                return null;
            }
            return {
                widthOfSurface: Number(widthOfSurface),
                surfaceLengthHeight: Number(surfaceLengthHeight),
                widthOfPlasterBoard: Number(widthOfPlasterBoard),
                heightOfPlasterBoard: Number(heightOfPlasterBoard)
            };
        }
        function handleInputValidation() {
            const numberInputFields = document.querySelectorAll(`.${className} .input_number`);
            numberInputFields.forEach((inputField => {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                if (!inputField.value) formWrapper.classList.add("error"); else formWrapper.classList.remove("error");
            }));
        }
        function calculateDerivedValues(inputValues) {
            const widthOfPlasterBoardResult = inputValues.widthOfPlasterBoard / 1e3;
            const heightOfPlasterBoardResult = inputValues.heightOfPlasterBoard / 1e3;
            const surfaceArea = inputValues.widthOfSurface * inputValues.surfaceLengthHeight;
            const areaOneSheet = widthOfPlasterBoardResult * heightOfPlasterBoardResult;
            let numberOfSheets;
            if (className === "form-tabs_1") numberOfSheets = Math.ceil(surfaceArea / areaOneSheet) * 2; else if (className === "form-tabs_2") numberOfSheets = Math.ceil(surfaceArea / areaOneSheet); else if (className === "form-tabs_3") numberOfSheets = Math.ceil(surfaceArea / areaOneSheet);
            return {
                widthOfPlasterBoardResult,
                heightOfPlasterBoardResult,
                surfaceArea,
                areaOneSheet,
                numberOfSheets
            };
        }
        const displayUI = data => {
            resultsItemsWrapper.innerHTML = "";
            const formWrappers = document.querySelectorAll(`.${className} .form-tabs__wrapper`);
            formWrappers.forEach((formWrapper => formWrapper.classList.remove("error")));
            data.forEach((({label, value}) => {
                const html = `\n        <div class="result__item">\n          <div class="result__label">${label}</div>\n          <div class="result__value">${value}</div>\n        </div>\n      `;
                resultsItemsWrapper.insertAdjacentHTML("afterbegin", html);
            }));
            resultDefault.style.display = "none";
            resultBody.style.display = "block";
        };
        if (calculateBtn) calculateBtn.addEventListener("click", (e => {
            e.preventDefault();
            calculate();
        }));
        const numberInputFields = document.querySelectorAll(".input_number");
        numberInputFields.forEach((inputField => {
            inputField.addEventListener("input", (() => {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                const inputValue = inputField.value;
                const sanitizedValue = inputValue.replace(/,/g, ".");
                const sanitizedInput = sanitizedValue.replace(/[^\d.,]/g, "");
                inputField.value = sanitizedInput;
                formWrapper.classList.remove("error");
            }));
        }));
        function calculate() {
            const inputValues = getInputValues();
            if (inputValues) {
                const calculatedValues = calculateDerivedValues(inputValues);
                const resultData = [ {
                    label: calculationLabel,
                    value: calculatedValues.numberOfSheets
                }, {
                    label: "Площадь одного листа гипсокартона (м²)",
                    value: calculatedValues.areaOneSheet
                }, {
                    label: "Площадь поверхности (м²)",
                    value: calculatedValues.surfaceArea
                }, {
                    label: "Высота листа гипсокартона (м)",
                    value: calculatedValues.heightOfPlasterBoardResult
                }, {
                    label: "Ширина листа гипсокартона (м)",
                    value: calculatedValues.widthOfPlasterBoardResult
                } ];
                displayUI(resultData);
            }
        }
        tabButtons.forEach((button => {
            button.addEventListener("click", (() => {
                resetResultDisplay();
            }));
        }));
    }
    function setupCalculation1() {
        setupCalculation("form-tabs_1", "Количество листов гипсокартона", "input_width-surface", "input_surface-length", "input_plasterboard-width", "input_plasterboard-height");
    }
    function setupCalculation2() {
        setupCalculation("form-tabs_2", "Количество листов гипсокартона", "input_width-surface-2", "input_surface-length-2", "input_plasterboard-width-2", "input_plasterboard-height-2");
    }
    function setupCalculation3() {
        setupCalculation("form-tabs_3", "Количество листов гипсокартона", "input_width-surface-3", "input_surface-length-3", "input_plasterboard-width-3", "input_plasterboard-height-3");
    }
    setupCalculation1();
    setupCalculation2();
    setupCalculation3();
    function setupCalculationPain(className, surfaceClass, lengthClass, layerClass) {
        const calculateBtn = document.querySelector(`.calculator-paint`);
        const resultsItemsWrapper = document.querySelector(".result__items");
        const resultDefault = document.querySelector(".result__default");
        const resultBody = document.querySelector(".result__body");
        const tabButtons = document.querySelectorAll("[data-tabs-titles] button");
        function resetResultDisplay() {
            resultsItemsWrapper.innerHTML = "";
            resultDefault.style.display = "block";
            resultBody.style.display = "none";
        }
        function getInputValues() {
            const widthOfSurface = document.querySelector(`.${surfaceClass}`).value;
            const surfaceLengthHeight = document.querySelector(`.${lengthClass}`).value;
            const numberOfLayers = document.querySelector(`.${layerClass}`).value;
            const selectedMaterialInput = document.querySelector(".options__input_type:checked");
            const selectedMaterialValue = selectedMaterialInput ? parseFloat(selectedMaterialInput.value) : 1;
            const selectedPaintTypeInput = document.querySelector(".options__input_paintType:checked");
            const selectedPaintTypeValue = selectedPaintTypeInput ? parseFloat(selectedPaintTypeInput.value) : 1;
            if (!widthOfSurface || !surfaceLengthHeight || !numberOfLayers) {
                handleInputValidation();
                return null;
            }
            return {
                widthOfSurface: Number(widthOfSurface),
                surfaceLengthHeight: Number(surfaceLengthHeight),
                numberOfLayers: Number(numberOfLayers),
                selectedMaterialValue,
                selectedPaintTypeValue
            };
        }
        function handleInputValidation() {
            const numberInputFields = document.querySelectorAll(`.${className} .input_number`);
            numberInputFields.forEach((inputField => {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                if (!inputField.value) formWrapper.classList.add("error"); else formWrapper.classList.remove("error");
            }));
        }
        function calculateDerivedValues(inputValues) {
            const surfaceArea = inputValues.widthOfSurface * inputValues.surfaceLengthHeight;
            let materialFactor;
            let paintTypeFactor;
            switch (inputValues.selectedMaterialValue) {
              case .9:
                materialFactor = .9;
                break;

              case .8:
                materialFactor = .8;
                break;

              case 1:
                materialFactor = 1;
                break;

              default:
                materialFactor = 1;
            }
            switch (inputValues.selectedPaintTypeValue) {
              case .25:
                paintTypeFactor = .25;
                break;

              case .6:
                paintTypeFactor = .6;
                break;

              case .2:
                paintTypeFactor = .2;
                break;

              case .55:
                paintTypeFactor = .55;
                break;

              case .3:
                paintTypeFactor = .3;
                break;

              case .4:
                paintTypeFactor = .4;
                break;

              case .15:
                paintTypeFactor = .15;
                break;

              default:
                paintTypeFactor = 1;
            }
            const totalPaintConsumption = surfaceArea * paintTypeFactor * inputValues.numberOfLayers * materialFactor;
            return {
                surfaceArea,
                materialFactor,
                paintTypeFactor,
                totalPaintConsumption
            };
        }
        const displayUI = data => {
            resultsItemsWrapper.innerHTML = "";
            const formWrappers = document.querySelectorAll(`.${className} .form-tabs__wrapper`);
            formWrappers.forEach((formWrapper => formWrapper.classList.remove("error")));
            data.forEach((({label, value}) => {
                const html = `\n        <div class="result__item">\n          <div class="result__label">${label}</div>\n          <div class="result__value">${value}</div>\n        </div>\n      `;
                resultsItemsWrapper.insertAdjacentHTML("afterbegin", html);
            }));
            resultDefault.style.display = "none";
            resultBody.style.display = "block";
        };
        if (calculateBtn) calculateBtn.addEventListener("click", (e => {
            e.preventDefault();
            calculate();
        }));
        const numberInputFields = document.querySelectorAll(".input_number");
        numberInputFields.forEach((inputField => {
            inputField.addEventListener("input", (() => {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                const inputValue = inputField.value;
                const sanitizedValue = inputValue.replace(/,/g, ".");
                const sanitizedInput = sanitizedValue.replace(/[^\d.,]/g, "");
                inputField.value = sanitizedInput;
                formWrapper.classList.remove("error");
            }));
        }));
        function calculate() {
            const inputValues = getInputValues();
            if (inputValues) {
                const calculatedValues = calculateDerivedValues(inputValues);
                const resultData = [ {
                    label: "Коэффициент для типа поверхности",
                    value: calculatedValues.materialFactor
                }, {
                    label: "Общий расход краски (литры)",
                    value: calculatedValues.totalPaintConsumption
                }, {
                    label: "Расход краски на м² (литр)",
                    value: calculatedValues.paintTypeFactor
                }, {
                    label: "Площадь поверхности (м²)",
                    value: calculatedValues.surfaceArea
                } ];
                displayUI(resultData);
            }
        }
        tabButtons.forEach((button => {
            button.addEventListener("click", (() => {
                resetResultDisplay();
            }));
        }));
    }
    setupCalculationPain("form-tabs_paint", "input_width-surface", "input_surface-length", "input_surface-layers");
    function setupWalpaperCalc(className, roomLength, roomWidth, roomHeight, walpaperRollWidth, walpaperRollLength, rapport, margin, pricePerRoll) {
        const calculateBtn = document.querySelector(`.wall-tiles-btn`);
        const resultsItemsWrapper = document.querySelector(".result__items");
        const resultDefault = document.querySelector(".result__default");
        const resultBody = document.querySelector(".result__body");
        const tabButtons = document.querySelectorAll("[data-tabs-titles] button");
        function resetResultDisplay() {
            resultsItemsWrapper.innerHTML = "";
            resultDefault.style.display = "block";
            resultBody.style.display = "none";
        }
        function getInputValues() {
            const roomLength1 = document.querySelector(`.${roomLength}`).value;
            const roomWidth1 = document.querySelector(`.${roomWidth}`).value;
            const roomHeight1 = document.querySelector(`.${roomHeight}`).value;
            const walpaperRollWidth1 = document.querySelector(`.${walpaperRollWidth}`).value;
            const walpaperRollLength1 = document.querySelector(`.${walpaperRollLength}`).value;
            const rapport1 = document.querySelector(`.${rapport}`).value;
            const margin1 = document.querySelector(`.${margin}`).value;
            const pricePerRoll1 = document.querySelector(`.${pricePerRoll}`).value;
            if (!roomLength1 || !roomWidth1 || !roomHeight1 || !walpaperRollWidth1 || !walpaperRollLength1 || !rapport1 || !margin1 || !pricePerRoll1) {
                handleInputValidation();
                return null;
            }
            return {
                roomLength1: Number(roomLength1),
                roomWidth1: Number(roomWidth1),
                roomHeight1: Number(roomHeight1),
                walpaperRollWidth1: Number(walpaperRollWidth1),
                walpaperRollLength1: Number(walpaperRollLength1),
                rapport1: Number(rapport1),
                margin1: Number(margin1),
                pricePerRoll1: Number(pricePerRoll1)
            };
        }
        function handleInputValidation() {
            const numberInputFields = document.querySelectorAll(`.${className} .input_number`);
            numberInputFields.forEach((inputField => {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                if (!inputField.value) formWrapper.classList.add("error"); else formWrapper.classList.remove("error");
            }));
        }
        function calculateDerivedValues(inputValues) {
            let areaOfWindowsDoors = 0;
            const windowTotal = calculateTotalAreaForWindows();
            const doorTotal = calculateTotalAreaForDoors();
            areaOfWindowsDoors = Number(doorTotal + windowTotal).toFixed(2);
            function calculateTotalAreaForDoors() {
                if (!isDoorsWrapperOpen) return 0;
                const doorsInputs = Array.from(document.querySelectorAll("#doorsWrapper .input_number"));
                if (doorsInputs.length === 0) return 0;
                const totalArea = doorsInputs.reduce(((accumulator, input) => {
                    const value = parseFloat(input.value.trim());
                    if (!isNaN(value)) return accumulator * value;
                    return 0;
                }), 1);
                return totalArea;
            }
            function calculateTotalAreaForWindows() {
                if (!isWindowsWrapperOpen) return 0;
                const windowsInputs = Array.from(document.querySelectorAll(`#windowsWrapper input`));
                if (windowsInputs.length === 0) return 0;
                const totalArea = windowsInputs.reduce(((accumulator, input) => {
                    const value = parseFloat(input.value.trim());
                    if (!isNaN(value)) return accumulator * value;
                    return 0;
                }), 1);
                return totalArea;
            }
            const realStripMargin = inputValues.roomHeight1 - inputValues.rapport1 * inputValues.margin1 / 100;
            console.log(realStripMargin);
            const roomPerimeter = (inputValues.roomLength1 + inputValues.roomWidth1) * 2;
            const coverageArea = roomPerimeter * inputValues.roomHeight1 - areaOfWindowsDoors;
            console.log(coverageArea);
            const requiredNumberOfStripes = Math.ceil(coverageArea / (inputValues.walpaperRollWidth1 * realStripMargin / 100));
            console.log(requiredNumberOfStripes);
            let numberOfStripsOneRoll;
            if (Math.floor(inputValues.walpaperRollLength1 / realStripMargin) === 0) numberOfStripsOneRoll = 1; else numberOfStripsOneRoll = inputValues.walpaperRollLength1 / realStripMargin;
            console.log(numberOfStripsOneRoll);
            const requiredNumberOfWalpaperRolls = Math.ceil(requiredNumberOfStripes / numberOfStripsOneRoll);
            const totalCostOfRolls = requiredNumberOfWalpaperRolls * inputValues.pricePerRoll1;
            const totalAreaOfAllWalls = (inputValues.roomLength1 + inputValues.roomWidth1) * 2 * inputValues.roomHeight1;
            return {
                requiredNumberOfWalpaperRolls,
                totalCostOfRolls,
                totalAreaOfAllWalls,
                roomPerimeter,
                areaOfWindowsDoors
            };
        }
        const displayUI = data => {
            resultsItemsWrapper.innerHTML = "";
            const formWrappers = document.querySelectorAll(`.${className} .form-tabs__wrapper`);
            formWrappers.forEach((formWrapper => formWrapper.classList.remove("error")));
            data.forEach((({label, value}) => {
                const html = `\n        <div class="result__item">\n          <div class="result__label">${label}</div>\n          <div class="result__value">${value}</div>\n        </div>\n      `;
                resultsItemsWrapper.insertAdjacentHTML("afterbegin", html);
            }));
            resultDefault.style.display = "none";
            resultBody.style.display = "block";
        };
        if (calculateBtn) if (!calculateBtn.hasEventListener) {
            calculateBtn.hasEventListener = true;
            calculateBtn.addEventListener("click", (e => {
                e.preventDefault();
                setupInputSanitization();
                calculate();
            }));
        }
        function setupInputSanitization() {
            const numberInputFields = document.querySelectorAll(".input_number");
            numberInputFields.forEach((inputField => {
                inputField.addEventListener("input", (() => {
                    const formWrapper = inputField.closest(".form-tabs__wrapper");
                    const inputValue = inputField.value;
                    const sanitizedValue = inputValue.replace(/,/g, ".");
                    const sanitizedInput = sanitizedValue.replace(/[^\d.,]/g, "");
                    inputField.value = sanitizedInput;
                    formWrapper.classList.remove("error");
                }));
            }));
        }
        document.addEventListener("DOMContentLoaded", (() => {
            setupInputSanitization();
        }));
        function calculate(callback) {
            const inputValues = getInputValues();
            if (inputValues) {
                const calculatedValues = calculateDerivedValues(inputValues);
                const resultData = [ {
                    label: "Периметр комнаты",
                    value: calculatedValues.roomPerimeter
                }, {
                    label: "Общая площадь всех стен:",
                    value: calculatedValues.totalAreaOfAllWalls
                }, {
                    label: "Общая стоиомть рулонов",
                    value: calculatedValues.totalCostOfRolls
                }, {
                    label: "Требуемое количество рулонов обоев",
                    value: calculatedValues.requiredNumberOfWalpaperRolls
                } ];
                displayUI(resultData);
                if (callback) callback(inputValues);
            }
        }
        tabButtons.forEach((button => {
            button.addEventListener("click", (() => {
                resetResultDisplay();
            }));
        }));
    }
    setupWalpaperCalc("tabs__body_wall-tiles", "input_roomLength", "input_roomWidth", "input_roomHeight", "input_walpaperRollWidth", "input_walpaperRollLength", "input_rapport", "input_margin", "input_pricePerRoll");
    function setupCalculationLam(className, roomLength, roomWidth, lengthOfPanel, widthOfPanel, numberOfPanelsInPackage) {
        const calculateBtn = document.querySelector(`.calculator-laminate`);
        const resultsItemsWrapper = document.querySelector(".result__items");
        const resultDefault = document.querySelector(".result__default");
        const resultBody = document.querySelector(".result__body");
        const tabButtons = document.querySelectorAll("[data-tabs-titles] button");
        function resetResultDisplay() {
            resultsItemsWrapper.innerHTML = "";
            resultDefault.style.display = "block";
            resultBody.style.display = "none";
        }
        function getInputValues() {
            const roomLength1 = document.querySelector(`.${roomLength}`).value;
            const roomWidth1 = document.querySelector(`.${roomWidth}`).value;
            const lengthOfPanel1 = document.querySelector(`.${lengthOfPanel}`).value;
            const widthOfPanel1 = document.querySelector(`.${widthOfPanel}`).value;
            const numberOfPanelsInPackage1 = document.querySelector(`.${numberOfPanelsInPackage}`).value;
            const selectedMethodLaminateInput = document.querySelector(".options__input_methodLaminate:checked");
            const selectedMethodLaminateValue = selectedMethodLaminateInput ? parseFloat(selectedMethodLaminateInput.value) : 1;
            if (!roomLength1 || !roomWidth1 || !lengthOfPanel1 || !widthOfPanel1 || !numberOfPanelsInPackage1) {
                handleInputValidation();
                return null;
            }
            return {
                roomLength1: Number(roomLength1),
                roomWidth1: Number(roomWidth1),
                lengthOfPanel1: Number(lengthOfPanel1),
                widthOfPanel1,
                numberOfPanelsInPackage1,
                selectedMethodLaminateValue
            };
        }
        function handleInputValidation() {
            const numberInputFields = document.querySelectorAll(`.${className} .input_number`);
            numberInputFields.forEach((inputField => {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                if (!inputField.value) formWrapper.classList.add("error"); else formWrapper.classList.remove("error");
            }));
        }
        function calculateDerivedValues(inputValues) {
            const roomArea = inputValues.roomLength1 * inputValues.roomWidth1;
            const panelAera = inputValues.lengthOfPanel1 * inputValues.widthOfPanel1;
            const withoutLeftOvers = Number(roomArea / panelAera).toFixed(2);
            let methodLaminateFactor;
            switch (inputValues.selectedMethodLaminateValue) {
              case 1:
                methodLaminateFactor = 1;
                break;

              case 1.05:
                methodLaminateFactor = 1.05;
                break;

              case 1.1:
                methodLaminateFactor = 1.1;
                break;

              case 1.12:
                methodLaminateFactor = 1.12;
                break;

              case 1.15:
                methodLaminateFactor = 1.15;
                break;

              case 1.2:
                methodLaminateFactor = 1.2;
                break;

              default:
                methodLaminateFactor = 1;
            }
            const coefficientFitting = methodLaminateFactor;
            const totalNumberOfPanels = Math.ceil(withoutLeftOvers * coefficientFitting);
            const quantityOfPackages = Math.ceil(totalNumberOfPanels / inputValues.numberOfPanelsInPackage1);
            return {
                roomArea,
                panelAera,
                withoutLeftOvers,
                coefficientFitting,
                totalNumberOfPanels,
                quantityOfPackages
            };
        }
        const displayUI = data => {
            resultsItemsWrapper.innerHTML = "";
            const formWrappers = document.querySelectorAll(`.${className} .form-tabs__wrapper`);
            formWrappers.forEach((formWrapper => formWrapper.classList.remove("error")));
            data.forEach((({label, value}) => {
                const html = `\n        <div class="result__item">\n          <div class="result__label">${label}</div>\n          <div class="result__value">${value}</div>\n        </div>\n      `;
                resultsItemsWrapper.insertAdjacentHTML("afterbegin", html);
            }));
            resultDefault.style.display = "none";
            resultBody.style.display = "block";
        };
        if (calculateBtn) calculateBtn.addEventListener("click", (e => {
            e.preventDefault();
            calculate();
        }));
        const numberInputFields = document.querySelectorAll(".input_number");
        numberInputFields.forEach((inputField => {
            inputField.addEventListener("input", (() => {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                const inputValue = inputField.value;
                const sanitizedValue = inputValue.replace(/,/g, ".");
                const sanitizedInput = sanitizedValue.replace(/[^\d.,]/g, "");
                inputField.value = sanitizedInput;
                formWrapper.classList.remove("error");
            }));
        }));
        function calculate() {
            const inputValues = getInputValues();
            if (inputValues) {
                const calculatedValues = calculateDerivedValues(inputValues);
                const resultData = [ {
                    label: "Количество упаковок",
                    value: calculatedValues.quantityOfPackages
                }, {
                    label: "Итоговое количество панелей",
                    value: calculatedValues.totalNumberOfPanels
                }, {
                    label: "Коэффициент укладки",
                    value: calculatedValues.coefficientFitting
                }, {
                    label: "Количество панелей без учета остатков",
                    value: calculatedValues.withoutLeftOvers
                }, {
                    label: "Площадь панели (м²)",
                    value: calculatedValues.panelAera
                }, {
                    label: "Площадь комнаты (м²)",
                    value: calculatedValues.roomArea
                } ];
                displayUI(resultData);
            }
        }
        tabButtons.forEach((button => {
            button.addEventListener("click", (() => {
                resetResultDisplay();
            }));
        }));
    }
    setupCalculationLam("form-body_laminate", "input_roomLength", "input_roomWidth", "input_lengthOfPanel", "input_widthOfPanel", "input_numberOfPanelsInPackage");
    function setupCalculationPlaster(className, lengthWall, heightWall, thicknessLayer, bagMass) {
        const calculateBtn = document.querySelector(`.calculator-plaster`);
        const resultsItemsWrapper = document.querySelector(".result__items");
        const resultDefault = document.querySelector(".result__default");
        const resultBody = document.querySelector(".result__body");
        const tabButtons = document.querySelectorAll("[data-tabs-titles] button");
        function resetResultDisplay() {
            resultsItemsWrapper.innerHTML = "";
            resultDefault.style.display = "block";
            resultBody.style.display = "none";
        }
        function getInputValues() {
            const lengthWall1 = document.querySelector(`.${lengthWall}`).value;
            const heightWall1 = document.querySelector(`.${heightWall}`).value;
            const thicknessLayer1 = document.querySelector(`.${thicknessLayer}`).value;
            const bagMass1 = document.querySelector(`.${bagMass}`).value;
            const selectedMethodPlasterTypeInput = document.querySelector(".options__input_plasterType:checked");
            const selectedMethodPlasterTypeValue = selectedMethodPlasterTypeInput ? parseFloat(selectedMethodPlasterTypeInput.value) : 1;
            if (!lengthWall1 || !heightWall1 || !thicknessLayer1 || !bagMass1 || !selectedMethodPlasterTypeValue) {
                handleInputValidation();
                return null;
            }
            return {
                lengthWall1: Number(lengthWall1),
                heightWall1: Number(heightWall1),
                thicknessLayer1: Number(thicknessLayer1),
                bagMass1,
                selectedMethodPlasterTypeValue
            };
        }
        function handleInputValidation() {
            const numberInputFields = document.querySelectorAll(`.${className} .input_number`);
            numberInputFields.forEach((inputField => {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                if (!inputField.value) formWrapper.classList.add("error"); else formWrapper.classList.remove("error");
            }));
        }
        function calculateDerivedValues(inputValues) {
            const wallArea = inputValues.lengthWall1 * inputValues.heightWall1;
            let methodPlasterFactor;
            switch (inputValues.selectedMethodPlasterTypeValue) {
              case 9:
                methodPlasterFactor = 9;
                break;

              case 17:
                methodPlasterFactor = 17;
                break;

              default:
                methodPlasterFactor = 1;
            }
            const coefficientOfLayerThickness = Math.floor(inputValues.thicknessLayer1 / methodPlasterFactor);
            const totalConsumptionOfPlaste = wallArea * methodPlasterFactor;
            const quantityOfPlasterBags = Math.ceil(totalConsumptionOfPlaste / inputValues.bagMass1);
            return {
                wallArea,
                coefficientOfLayerThickness,
                methodPlasterFactor,
                totalConsumptionOfPlaste,
                quantityOfPlasterBags
            };
        }
        const displayUI = data => {
            resultsItemsWrapper.innerHTML = "";
            const formWrappers = document.querySelectorAll(`.${className} .form-tabs__wrapper`);
            formWrappers.forEach((formWrapper => formWrapper.classList.remove("error")));
            data.forEach((({label, value}) => {
                const html = `\n        <div class="result__item">\n          <div class="result__label">${label}</div>\n          <div class="result__value">${value}</div>\n        </div>\n      `;
                resultsItemsWrapper.insertAdjacentHTML("afterbegin", html);
            }));
            resultDefault.style.display = "none";
            resultBody.style.display = "block";
        };
        if (calculateBtn) calculateBtn.addEventListener("click", (e => {
            e.preventDefault();
            calculate();
        }));
        const numberInputFields = document.querySelectorAll(".input_number");
        numberInputFields.forEach((inputField => {
            inputField.addEventListener("input", (() => {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                const inputValue = inputField.value;
                const sanitizedValue = inputValue.replace(/,/g, ".");
                const sanitizedInput = sanitizedValue.replace(/[^\d.,]/g, "");
                inputField.value = sanitizedInput;
                formWrapper.classList.remove("error");
            }));
        }));
        function calculate() {
            const inputValues = getInputValues();
            if (inputValues) {
                console.log(inputValues);
                const calculatedValues = calculateDerivedValues(inputValues);
                const resultData = [ {
                    label: "Количество мешков штукатурки",
                    value: calculatedValues.quantityOfPlasterBags
                }, {
                    label: "Общий расход штукатурки (кг)",
                    value: calculatedValues.totalConsumptionOfPlaste
                }, {
                    label: "Расход штукатурки на 1 м² (кг)",
                    value: calculatedValues.methodPlasterFactor
                }, {
                    label: "Коэффициент толщины слоя",
                    value: calculatedValues.coefficientOfLayerThickness
                }, {
                    label: "Площадь стены (м²)",
                    value: calculatedValues.wallArea
                } ];
                displayUI(resultData);
            }
        }
        tabButtons.forEach((button => {
            button.addEventListener("click", (() => {
                resetResultDisplay();
            }));
        }));
    }
    setupCalculationPlaster("tabs__body_plaster", "input_lengthWall", "input_heightWall", "input_thicknessLayer", "input_bagMass");
    document.addEventListener("DOMContentLoaded", (function() {
        var pinWrapper = document.querySelector(".pin-wrapper");
        if (pinWrapper) {
            var pinBlock = document.querySelector(".pin-block");
            var placeholder = document.createElement("div");
            placeholder.classList.add("pin-block-placeholder");
            function getHeaderHeight() {
                var header = document.querySelector(".header");
                return header ? header.offsetHeight : 0;
            }
            function handleScroll() {
                if (window.innerWidth >= 767.98) {
                    var pinBlockOffset = pinWrapper.offsetTop - getHeaderHeight() - 20;
                    var scrollPosition = window.scrollY;
                    if (scrollPosition >= pinBlockOffset) {
                        pinBlock.classList.add("pinned");
                        pinBlock.style.position = "fixed";
                        placeholder.style.height = pinBlock.clientHeight + "px";
                    } else {
                        pinBlock.classList.remove("pinned");
                        pinBlock.style.position = "static";
                        placeholder.style.height = "0";
                    }
                }
            }
            function handleResize() {
                handleScroll();
            }
            window.addEventListener("scroll", handleScroll);
            window.addEventListener("resize", handleResize);
            pinWrapper.appendChild(placeholder);
        }
    }));
    function setupCalculationTiles(className, roomLength, roomWidth, roomHeight, bathWidth, bathHeight, tileLength, tileWidth, seamWidth) {
        const calculateBtn = document.querySelector(`.calculate-tiles`);
        const resultsItemsWrapper = document.querySelector(".result__items");
        const resultDefault = document.querySelector(".result__default");
        const resultBody = document.querySelector(".result__body");
        const tabButtons = document.querySelectorAll("[data-tabs-titles] button");
        function resetResultDisplay() {
            resultsItemsWrapper.innerHTML = "";
            resultDefault.style.display = "block";
            resultBody.style.display = "none";
        }
        function getInputValues() {
            const roomLength1 = document.querySelector(`.${roomLength}`).value;
            const roomWidth1 = document.querySelector(`.${roomWidth}`).value;
            const roomHeight1 = document.querySelector(`.${roomHeight}`).value;
            const bathWidth1 = document.querySelector(`.${bathWidth}`).value;
            const bathHeight1 = document.querySelector(`.${bathHeight}`).value;
            const tileLength1 = document.querySelector(`.${tileLength}`).value;
            const tileWidth1 = document.querySelector(`.${tileWidth}`).value;
            const seamWidth1 = document.querySelector(`.${seamWidth}`).value;
            const selectedBathTypeInput = document.querySelector(".options__input_bathType:checked");
            const selectedBathTypeValue = selectedBathTypeInput ? selectedBathTypeInput.value : no;
            const selectedMethodTilesInput = document.querySelector(".options__input_methodTiles:checked");
            const selectedMethodTilesValue = selectedMethodTilesInput ? parseFloat(selectedMethodTilesInput.value) : 1;
            if (!roomLength1 || !roomWidth1 || !roomHeight1 || !bathWidth1 || !bathHeight1 || !tileLength1 || !tileWidth1 || !seamWidth1 || !selectedBathTypeValue || !selectedMethodTilesValue) {
                handleInputValidation();
                return null;
            }
            return {
                roomLength1: Number(roomLength1),
                roomWidth1: Number(roomWidth1),
                roomHeight1: Number(roomHeight1),
                bathWidth1: Number(bathWidth1),
                bathHeight1: Number(bathHeight1),
                tileLength1: Number(tileLength1),
                tileWidth1: Number(tileWidth1),
                seamWidth1: Number(seamWidth1),
                selectedBathTypeValue,
                selectedMethodTilesValue
            };
        }
        function handleInputValidation() {
            const numberInputFields = document.querySelectorAll(`.${className} .input_number`);
            numberInputFields.forEach((inputField => {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                if (!inputField.value) formWrapper.classList.add("error"); else formWrapper.classList.remove("error");
            }));
        }
        function calculateDerivedValues(inputValues) {
            let methodBathTypeFactor;
            let methodTilesFactor;
            switch (inputValues.selectedBathTypeValue) {
              case "yes":
                methodBathTypeFactor = true;
                break;

              case "no":
                methodBathTypeFactor = false;
                break;
            }
            switch (inputValues.selectedMethodTilesValue) {
              case 1.05:
                methodTilesFactor = 1.05;
                break;

              case 1.1:
                methodTilesFactor = 1.1;
                break;

              case 1.15:
                methodTilesFactor = 1.15;
                break;
            }
            let windowTotal = 0;
            const windowTotalTest = calculateTotalAreaForWindows();
            windowTotal = windowTotalTest;
            let doorTotal = 0;
            const doorTotalTest = calculateTotalAreaForDoors();
            doorTotal = doorTotalTest;
            console.log(doorTotal);
            console.log(windowTotal);
            function calculateTotalAreaForDoors() {
                if (!isDoorsWrapperOpen) return 0;
                const doorsInputs = Array.from(document.querySelectorAll("#doorsWrapper .input_number"));
                if (doorsInputs.length === 0) return 0;
                const totalArea = doorsInputs.reduce(((accumulator, input) => {
                    const value = parseFloat(input.value.trim());
                    if (!isNaN(value)) return accumulator * value;
                    return 0;
                }), 1);
                return totalArea;
            }
            function calculateTotalAreaForWindows() {
                if (!isWindowsWrapperOpen) return 0;
                const windowsInputs = Array.from(document.querySelectorAll(`#windowsWrapper input`));
                if (windowsInputs.length === 0) return 0;
                const totalArea = windowsInputs.reduce(((accumulator, input) => {
                    const value = parseFloat(input.value.trim());
                    if (!isNaN(value)) return accumulator * value;
                    return 0;
                }), 1);
                return totalArea;
            }
            let peripheryForLining;
            if (methodBathTypeFactor) peripheryForLining = Number(2 * (inputValues.roomLength1 + inputValues.roomWidth1) - 2 * inputValues.bathWidth1).toFixed(2); else peripheryForLining = Number(2 * (inputValues.roomLength1 + inputValues.roomWidth1).toFixed(2));
            let totalWallAreaForCladding = Number(peripheryForLining * inputValues.roomHeight1 - doorTotal - windowTotal).toFixed(2);
            const areaOfOneTileWithSeam = Number((inputValues.tileLength1 + inputValues.seamWidth1 / 1e3) * (inputValues.tileWidth1 + inputValues.seamWidth1 / 1e3)).toFixed(2);
            const flowCoefficient = methodTilesFactor;
            const numberOfTiles = Math.ceil(totalWallAreaForCladding / areaOfOneTileWithSeam * flowCoefficient);
            return {
                peripheryForLining,
                totalWallAreaForCladding,
                areaOfOneTileWithSeam,
                flowCoefficient,
                numberOfTiles
            };
        }
        const displayUI = data => {
            resultsItemsWrapper.innerHTML = "";
            const formWrappers = document.querySelectorAll(`.${className} .form-tabs__wrapper`);
            formWrappers.forEach((formWrapper => formWrapper.classList.remove("error")));
            data.forEach((({label, value}) => {
                const html = `\n        <div class="result__item">\n          <div class="result__label">${label}</div>\n          <div class="result__value">${value}</div>\n        </div>\n      `;
                resultsItemsWrapper.insertAdjacentHTML("afterbegin", html);
            }));
            resultDefault.style.display = "none";
            resultBody.style.display = "block";
        };
        if (calculateBtn) calculateBtn.addEventListener("click", (e => {
            e.preventDefault();
            calculate();
        }));
        const formTabsWrapper = document.getElementById("doorsWrapper");
        formTabsWrapper.addEventListener("input", (event => {
            const inputField = event.target;
            if (inputField.classList.contains("input_number")) {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                const inputValue = inputField.value;
                const sanitizedValue = inputValue.replace(/,/g, ".");
                const sanitizedInput = sanitizedValue.replace(/[^\d.,]/g, "");
                inputField.value = sanitizedInput;
                formWrapper.classList.remove("error");
            }
        }));
        const windowTabsWrapper = document.getElementById("windowsWrapper");
        windowTabsWrapper.addEventListener("input", (event => {
            const inputField = event.target;
            if (inputField.classList.contains("input_number")) {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                const inputValue = inputField.value;
                const sanitizedValue = inputValue.replace(/,/g, ".");
                const sanitizedInput = sanitizedValue.replace(/[^\d.,]/g, "");
                inputField.value = sanitizedInput;
                formWrapper.classList.remove("error");
            }
        }));
        function calculate() {
            const inputValues = getInputValues();
            if (inputValues) {
                const calculatedValues = calculateDerivedValues(inputValues);
                const resultData = [ {
                    label: "Количество плитки (шт.)",
                    value: calculatedValues.numberOfTiles
                }, {
                    label: "Коэффициент расхода",
                    value: calculatedValues.flowCoefficient
                }, {
                    label: "Площадь одной плитки с швом",
                    value: calculatedValues.areaOfOneTileWithSeam
                }, {
                    label: "Общая площадь стен для облицовки",
                    value: calculatedValues.totalWallAreaForCladding
                }, {
                    label: "Периметр для облицовки",
                    value: calculatedValues.peripheryForLining
                } ];
                displayUI(resultData);
            }
        }
        tabButtons.forEach((button => {
            button.addEventListener("click", (() => {
                resetResultDisplay();
            }));
        }));
    }
    setupCalculationTiles("tabs__body_wall-tiles", "input_roomLength", "input_roomWidth", "input_roomHeight", "input_bathWidth", "input_bathHeight", "input_tileLength", "input_tileWidth", "input_seamWidth");
    function setupCalculationFloorTiles(className, roomLength, roomWidth, tileLength, tileWidth, seamWidth) {
        const calculateBtn = document.querySelector(`.calculate-floor-tiles`);
        const resultsItemsWrapper = document.querySelector(".result__items");
        const resultDefault = document.querySelector(".result__default");
        const resultBody = document.querySelector(".result__body");
        const tabButtons = document.querySelectorAll("[data-tabs-titles] button");
        function resetResultDisplay() {
            resultsItemsWrapper.innerHTML = "";
            resultDefault.style.display = "block";
            resultBody.style.display = "none";
        }
        function getInputValues() {
            const roomLength1 = document.querySelector(`.${roomLength}`).value;
            const roomWidth1 = document.querySelector(`.${roomWidth}`).value;
            const tileLength1 = document.querySelector(`.${tileLength}`).value;
            const tileWidth1 = document.querySelector(`.${tileWidth}`).value;
            const seamWidth1 = document.querySelector(`.${seamWidth}`).value;
            const selectedMethodTilesInput = document.querySelector(".options__input_methodTiles1:checked");
            const selectedMethodTilesValue = selectedMethodTilesInput ? parseFloat(selectedMethodTilesInput.value) : 1;
            if (!roomLength1 || !roomWidth1 || !tileLength1 || !tileWidth1 || !seamWidth1 || !selectedMethodTilesValue) {
                handleInputValidation();
                return null;
            }
            return {
                roomLength1: Number(roomLength1),
                roomWidth1: Number(roomWidth1),
                tileLength1: Number(tileLength1),
                tileWidth1: Number(tileWidth1),
                seamWidth1: Number(seamWidth1),
                selectedMethodTilesValue
            };
        }
        function handleInputValidation() {
            const numberInputFields = document.querySelectorAll(`.${className} .input_number`);
            numberInputFields.forEach((inputField => {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                if (!inputField.value) formWrapper.classList.add("error"); else formWrapper.classList.remove("error");
            }));
        }
        function calculateDerivedValues(inputValues) {
            let methodTilesFactor;
            switch (inputValues.selectedMethodTilesValue) {
              case 1.05:
                methodTilesFactor = 1.05;
                break;

              case 1.1:
                methodTilesFactor = 1.1;
                break;

              case 1.15:
                methodTilesFactor = 1.15;
                break;

              default:
                methodTilesFactor = 1;
            }
            const roomArea = inputValues.roomLength1 * inputValues.roomWidth1;
            const areaOfOneTile = Number((inputValues.tileLength1 + .001 * inputValues.seamWidth1) * (inputValues.tileWidth1 + .001 * inputValues.seamWidth1)).toFixed(2);
            const trimmingFactor = methodTilesFactor;
            const requiredNumberOfTiles = Math.ceil(roomArea / areaOfOneTile * trimmingFactor);
            return {
                roomArea,
                areaOfOneTile,
                trimmingFactor,
                requiredNumberOfTiles
            };
        }
        const displayUI = data => {
            resultsItemsWrapper.innerHTML = "";
            const formWrappers = document.querySelectorAll(`.${className} .form-tabs__wrapper`);
            formWrappers.forEach((formWrapper => formWrapper.classList.remove("error")));
            data.forEach((({label, value}) => {
                const html = `\n        <div class="result__item">\n          <div class="result__label">${label}</div>\n          <div class="result__value">${value}</div>\n        </div>\n      `;
                resultsItemsWrapper.insertAdjacentHTML("afterbegin", html);
            }));
            resultDefault.style.display = "none";
            resultBody.style.display = "block";
        };
        if (calculateBtn) calculateBtn.addEventListener("click", (e => {
            e.preventDefault();
            calculate();
        }));
        const numberInputFields = document.querySelectorAll(".input_number");
        numberInputFields.forEach((inputField => {
            inputField.addEventListener("input", (() => {
                const formWrapper = inputField.closest(".form-tabs__wrapper");
                const inputValue = inputField.value;
                const sanitizedValue = inputValue.replace(/,/g, ".");
                const sanitizedInput = sanitizedValue.replace(/[^\d.,]/g, "");
                inputField.value = sanitizedInput;
                formWrapper.classList.remove("error");
            }));
        }));
        function calculate() {
            const inputValues = getInputValues();
            if (inputValues) {
                const calculatedValues = calculateDerivedValues(inputValues);
                const resultData = [ {
                    label: "Необходимое количество плитки (шт.)",
                    value: calculatedValues.requiredNumberOfTiles
                }, {
                    label: "Коэффициент подрезки",
                    value: calculatedValues.trimmingFactor
                }, {
                    label: "Площадь одной плитки (м²)",
                    value: calculatedValues.areaOfOneTile
                }, {
                    label: "Площадь помещения (м²)",
                    value: calculatedValues.roomArea
                } ];
                displayUI(resultData);
            }
        }
        tabButtons.forEach((button => {
            button.addEventListener("click", (() => {
                resetResultDisplay();
            }));
        }));
    }
    setupCalculationFloorTiles("tabs__body_floor-tiles", "input_roomLength1", "input_roomWidth1", "input_tileLength1", "input_tileWidth1", "input_seamWidth1");
    window["FLS"] = false;
    isWebp();
    menuInit();
    tabs();
    formFieldsInit({
        viewPass: false,
        autoHeight: false
    });
})();