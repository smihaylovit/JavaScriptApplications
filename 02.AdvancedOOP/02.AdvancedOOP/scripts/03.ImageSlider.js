﻿var Controler = (function () {
    var Image = {
        init: function (title, smallUrl, bigUrl) {
            this.title = title;
            this.smallUrl = smallUrl;
            this.bigUrl = bigUrl;
        }
    }

    var Button = {
        init: function (id, title) {
            this.id = id;
            this.title = title;
        }
    };


    var SlideControler = {
        init: function (selectorImages, selectorPreview) {
            this.wrapper = document.getElementById(selectorImages);
            this.images = [];
            this.preview = document.getElementById(selectorPreview);
            this.currentImageNumber;
        },

        addImage: function (title, smallUrl, bigUrl) {
            var img = Object.create(Image);
            img.init(title, smallUrl, bigUrl);
            this.images.push(img);
        },
        
        renderImages: function () {
            var i = 0;
            var fragment = document.createDocumentFragment();
            for (i = 0; i < this.images.length; i++) {
                var img = document.createElement("img");
                img.id = i;
                img.setAttribute("title", this.images[i].title);
                img.setAttribute("src", this.images[i].smallUrl);
                img.setAttribute("alt", this.images[i].title);
                img.style.width = "160px";
                img.style.height = "90px";

                fragment.appendChild(img);
            }

            this.wrapper.appendChild(fragment);
            var that = this;
            this.addHandler(this.wrapper, "click", function (ev) {
                if (!ev) {
                    ev = window.event;
                }
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                }
                if (ev.preventDefault) {
                    ev.preventDefault();
                }

                var target = ev.target || ev.srcElement;
                if (target instanceof HTMLImageElement) {
                    that.currentImageNumber = target.id;
                    that.showBigImage(that.currentImageNumber);
                }
            });
        },

        showBigImage: function (id) {
            var img = document.createElement("img");
            img.id = "preview-image";
            img.setAttribute("title", this.images[id].title);
            img.setAttribute("src", this.images[id].bigUrl);
            img.setAttribute("alt", this.images[id].title);
            img.style.width = "1050px";
            img.style.height = "590px";
            var oldImage = document.getElementById("preview-image");
            if (oldImage) {
                this.preview.removeChild(oldImage);
            }
            else {
                this.addButton("left");
                this.addButton("right");
                this.attachPreviewEvents();
            }
            this.preview.appendChild(img);
        },

        attachPreviewEvents: function(){
            var that = this;
            this.addHandler(this.preview, "click", function (ev) {
                if (!ev) {
                    ev = window.event;
                }
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                }
                if (ev.preventDefault) {
                    ev.preventDefault();
                }

                var target = ev.target || ev.srcElement;
                if (target instanceof HTMLButtonElement) {
                    if (target.id == "leftButton" && that.currentImageNumber != 0) {
                        that.currentImageNumber--;
                        that.showBigImage(that.currentImageNumber);
                    }

                    if (target.id == "rightButton" && that.currentImageNumber != that.images.length - 1) {
                        that.currentImageNumber++;
                        that.showBigImage(that.currentImageNumber);
                    }
                }
            });
        },

        addButton: function (side) {
            var button = Object.create(Button);
            var btn = document.createElement("button");
            btn.className = "button";
            btn.style.position = "absolute";
            btn.style.top = "450px";
            if (side == "left") {
                button.init("leftButton", side);
                btn.style.left = "120px"
                btn.innerHTML = "<";
            }
            if (side == "right") {
                button.init("rightButton", side);
                btn.style.left = "1093px"
                btn.innerHTML = ">";
            }

            btn.id = button.id;
            this.preview.appendChild(btn);
        },

        addHandler: function (element, eventType, eventHandler) {
            if (element.addEventListener) {
                element.addEventListener(eventType, eventHandler, false);
            } else if (document.attachEvent) {
                element.attachEvent("on" + eventType, eventHandler);
            }
            else {
                element["on" + eventType] = eventHandler;
            }
        }
    }

    createSlideControler = function () {
        return Object.create(SlideControler);
    }
    return {
        createSlideControler: createSlideControler
    }

})();