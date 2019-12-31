var imgOptimize = {
    _canvas: null,
    _cxt: null,
    _x: 0,
    _y: 0,
    _img: new Image(), //容器内图片对象
    _imgWidth: 0,
    _imgHeight: 0, //容器内图片宽和高
    _rigthCount: 0,
    _leftCount: 0, //旋转次数
    _verticalCount: 0,
    _horizontalCount: 0,
    imgUrl: '',
    imagesData: [],
    $imgObj: null,
    $thisImg: null,
    chooseW: 350,
    chooseH: 350,
    init: function () {
        imgOptimize.flipInit();

        // $("#btnOptimizeImg").click(function () {
        //     imgOptimize.uploadImg();
        // });

        document.querySelectorAll(".PicPosition input").forEach(function (item, index) {
            if (index == 0) {
                item.checked = true
            } else {
                item.checked = false
            }
        });
        document.querySelectorAll("#filter input").forEach(function (item, index) {
            if (index == 0) {
                item.checked = true
            } else {
                item.checked = false
            }
        });

        var cutspans = document.querySelectorAll("#btn-img-bl span");
        for (var i = 0; i < cutspans.length; i++) {
            cutspans[i].onclick = imgOptimize.cutClickFn;
        }

    },
    open: function (src) {
        // this.$imgObj = obj;
        // var src = this.$imgObj.src;
        this.imgUrl = src;
        // document.querySelector(".modal-backdrop").style.display = "block";
        this._canvas = document.getElementById("c1");
        this._cxt = this._canvas.getContext("2d");
        this._cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        var img = this._img;

        img.crossOrigin = 'anonymous';
        img.src = this.imgUrl;

        img.onload = function () {
            var canvas = imgOptimize._canvas;
            if (img.width < canvas.width && img.height < canvas.height) { //是否图片小于容器
                imgOptimize._imgWidth = img.width;
                imgOptimize._imgHeight = img.height;
            } else {
                imgOptimize._imgWidth = img.width > img.height ? canvas.width : (img.width / (img.height / canvas.height));
                imgOptimize._imgHeight = img.height > img.width ? canvas.height : (img.height / (img.width / canvas.width));
            }
            imgOptimize._img_X = (canvas.width - imgOptimize._imgWidth) / 2;
            imgOptimize._img_Y = (canvas.height - imgOptimize._imgHeight) / 2;
            imgOptimize._x = canvas.width / 2; //画布宽度的一半
            imgOptimize._y = canvas.height / 2; //画布高度的一半

            imgOptimize._cxt.drawImage(img, imgOptimize._img_X, imgOptimize._img_Y, imgOptimize._imgWidth, imgOptimize._imgHeight);

        };
        //this.setImagesData(src);
        document.querySelector(".optimize-menu li").click();
        return true;
    },
    cutClickFn: function () {
        var margin_left = 0;
        var margin_top = 0;
        var $choose_box = document.getElementById('choose_box');
        var $img3_1 = document.getElementById('i3_1');
        document.querySelectorAll("#btn-img-bl span").forEach(function (item, index) {
            item.classList.remove("active");
        });
        this.classList.add("active")
        var d = this.getAttribute("data-value");
        if (d == 1) {
            imgOptimize.chooseW = 350;
            imgOptimize.chooseH = 350;
            margin_top = 0;
            margin_left = 0;
        } else if (d == 2) {
            imgOptimize.chooseW = 262.5;
            imgOptimize.chooseH = 350;
            margin_top = 0;
            margin_left = (350 - 262.5) / 2;
        } else if (d == 3) {
            imgOptimize.chooseW = 350;
            imgOptimize.chooseH = 262.5;
            margin_top = (350 - 262.5) / 2;
            margin_left = 0;
        } else if (d == 4) {
            imgOptimize.chooseW = 196.875;
            imgOptimize.chooseH = 350;
            margin_top = 0;
            margin_left = (350 - 196.875) / 2;
        } else if (d == 5) {
            imgOptimize.chooseW = 350;
            imgOptimize.chooseH = 196.875;
            margin_top = (350 - 196.875) / 2;
            margin_left = 0;
        }
        console.log(-margin_left);
        $img3_1.style.marginLeft = -margin_left + 'px';
        $img3_1.style.marginTop = -margin_top + 'px';
        $choose_box.style.width = imgOptimize.chooseW + 'px';
        $choose_box.style.height = imgOptimize.chooseH + 'px';
        $choose_box.style.left = margin_left + 'px';
        $choose_box.style.top = margin_top + 'px';
    },
    setImagesData: function (src) { //获得所有图片
        var images = [];
        images.push(src);
        // $(".goodsImg").each(function () {
        //     var currentSrc = $(this).attr("src");
        //     if (currentSrc != src) {
        //         images.push(currentSrc);
        //     }
        // });
        this.imagesData = images;
    },

    rotateInit: function () {
        this._canvas = document.getElementById("c1");
        this._cxt = this._canvas.getContext("2d");

        this._leftCount = 0;
        this._rigthCount = 0;
        this._cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        this._cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
    },
    leftRotate: function () {

        var cxt = this._cxt;
        var x = this._x;
        var y = this._y;
        this._leftCount += 1;

        cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        cxt.save();

        var angle = (this._leftCount - this._rigthCount) * (-90 * Math.PI / 180);

        cxt.translate(x, y); //将绘图原点移到画布中点
        cxt.rotate(angle); //旋转角度
        cxt.translate(-x, -y); //将画布原点移动
        cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片

        cxt.restore();
    },
    rightRotate: function () {

        var cxt = this._cxt;
        var x = this._x;
        var y = this._y;
        this._rigthCount += 1;

        cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        cxt.save();

        var angle = (this._rigthCount - this._leftCount) * (90 * Math.PI / 180);

        cxt.translate(x, y); //将绘图原点移到画布中点
        cxt.rotate(angle); //旋转角度
        cxt.translate(-x, -y); //将画布原点移动
        cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片

        cxt.restore();
    },
    resetRotate: function () {

        this._leftCount = 0;
        this._rigthCount = 0;

        this._cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        this._cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
    },
    saveRotate: function () {
        // layer.tips("应用成功！", '#btn-rotate-save', {
        //     tips: 2
        // });
        var imageData = this._cxt.getImageData(0, 0, this._canvas.width, this._canvas.height);
        for (var i = 0; i < imageData.data.length; i += 4) {
            // 当该像素是透明的，则设置成白色   
            if (imageData.data[i + 3] == 0) {
                imageData.data[i] = 255;
                imageData.data[i + 1] = 255;
                imageData.data[i + 2] = 255;
                imageData.data[i + 3] = 255;
            }
        }
        this._cxt.putImageData(imageData, 0, 0);
        this._img.src = this._canvas.toDataURL("image/png");

        this._leftCount = 0;
        this._rigthCount = 0;

    },

    flipInit: function () {
        this._verticalCount = 0;
        this._horizontalCount = 0;
        this._canvas = document.getElementById("c2");
        this._cxt = this._canvas.getContext("2d");

        this._cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        this._cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
    },
    verticalFlip: function () {

        var cxt = this._cxt;

        cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        if (this._verticalCount == 0) {
            cxt.save();
            cxt.translate(0, this._canvas.height);
            cxt.scale(1, -1);
            cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
            cxt.restore();
            this._verticalCount = 1;
        } else {
            cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
            this._verticalCount = 0;
        }

    },
    horizontalFlip: function () {

        var cxt = this._cxt;

        cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容

        if (this._horizontalCount == 0) {
            cxt.save();
            cxt.translate(this._canvas.width, 0);
            cxt.scale(-1, 1);
            cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
            cxt.restore();
            this._horizontalCount = 1;
        } else {
            cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
            this._horizontalCount = 0;
        }

    },
    resetFlip: function () {

        this._verticalCount = 0;
        this._horizontalCount = 0;
        this._cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        this._cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
    },
    saveFlip: function () {
        // layer.tips("应用成功！", '#btn-flip-save', {
        //     tips: 2
        // });
        var imageData = this._cxt.getImageData(0, 0, this._canvas.width, this._canvas.height);
        for (var i = 0; i < imageData.data.length; i += 4) {
            // 当该像素是透明的，则设置成白色   
            if (imageData.data[i + 3] == 0) {
                imageData.data[i] = 255;
                imageData.data[i + 1] = 255;
                imageData.data[i + 2] = 255;
                imageData.data[i + 3] = 255;
            }
        }
        this._cxt.putImageData(imageData, 0, 0);
        this._img.src = this._canvas.toDataURL("image/png");

        this._verticalCount = 0;
        this._horizontalCount = 0;
    },


    cutInit: function () {
        this._cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        this._cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
        this._img.src = this._canvas.toDataURL("image/png");

        document.getElementById("i3").src = this._img.src;
        document.getElementById("i3_1").src = this._img.src;

        var choosebox = document.getElementById("choose_box");

        var drag = false;
        var disX = 0;
        var disY = 0;
        choosebox.onmousedown = function (event) {
            drag = true;
            disX = event.clientX - choosebox.offsetLeft;
            disY = event.clientY - choosebox.offsetTop;

            return false
        };

        document.onmousemove = function (event) {
            if (!drag)
                return;
            var iL = event.clientX - disX;
            var iT = event.clientY - disY;

            //把图层范围定在容器大小窗口内
            var maxL = 350 - choosebox.offsetWidth;
            var maxT = 350 - choosebox.offsetHeight;

            iL = iL < 0 ? 0 : iL;
            iL = iL > maxL ? maxL : iL;
            iT = iT < 0 ? 0 : iT;
            iT = iT > maxT ? maxT : iT;

            choosebox.style.marginTop = choosebox.style.marginLeft = 0;
            choosebox.style.left = iL + "px";
            choosebox.style.top = iT + "px";
            var img3_1 = document.getElementById("i3_1");
            img3_1.style.marginLeft = -iL + "px";
            img3_1.style.marginTop = -iT + "px";
            return false
        };
        document.onmouseup = function () {
            drag = false;
        };
    },
    cut: function () {
        var zoom = 0;
        if (this._img.width > this._img.height) {
            zoom = (this._img.width / 350);
        } else {
            zoom = (this._img.height / 350);
        }
        var $choose_box = document.getElementById("choose_box");
        var cutX = $choose_box.offsetLeft * zoom;
        var cutY = $choose_box.offsetTop * zoom;
        var cutWidth = this.chooseW * zoom;
        var cutHeight = this.chooseH * zoom;
        var x = 0;
        var y = 0;
        //alert(cutX + "," + cutY);
        //alert(cutWidth + "," + cutHeight);

        if (cutWidth > cutHeight) {
            x = 0;
            y = (this._img.height - cutHeight) / 2;
        } else if (cutWidth < cutHeight) {
            x = (this._img.width - cutWidth) / 2;
            y = 0;
        } else if (cutWidth = cutHeight) {
            x = 0;
            y = 0;
        }

        this._cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容

        this._cxt.drawImage(this._img, cutX, cutY, cutWidth, cutHeight, x, y, cutWidth, cutHeight);
        var imageData = this._cxt.getImageData(0, 0, this._canvas.width, this._canvas.height);
        for (var i = 0; i < imageData.data.length; i += 4) {
            // 当该像素是透明的，则设置成白色   
            if (imageData.data[i + 3] == 0) {
                imageData.data[i] = 255;
                imageData.data[i + 1] = 255;
                imageData.data[i + 2] = 255;
                imageData.data[i + 3] = 255;
            }
        }
        this._cxt.putImageData(imageData, 0, 0);
        this._img.src = this._canvas.toDataURL("image/png");
        document.querySelector(".optimize-menu li").click();
    },
    puzzleInit: function () {
        // var _this = this;
        // this.puzzleImgHtml = '<img src="' + this._img.src + '"  style="display:inline-block;width:796px;height:796px;position:absolute;top:0;left:-140px;"  />';
        // this.html1 = '<div class="puzzle-item puzzle-two-left"><span></span>' + this.puzzleImgHtml + '</div>' +
        //     '<div class="puzzle-item puzzle-two-right empty"><span></span></div>';
        // $("#puzzleContainer").html(this.html1);
        // this.puzzleItemClick();
        // var imgHtml = "";
        // this.imagesData.forEach(function (src, index) {
        //     if (index == 0) {
        //         src = _this._img.src;
        //     }
        //     imgHtml += '<img class="opt-puzzle-item" src="' + src + '" />';
        // });
        // $(".opt-puzzle-btn").removeClass("active").eq(0).addClass("active");
        // $("#optAsideBtn").html(imgHtml);
        // this.puzzleBtnClick();
    },
    puzzleTypeTab: function () { 
    },
    puzzleItemClick: function () { 
    },
    puzzleBtnClick: function () { 
    },
    puzzleSaveClick: function () { 
    },
    brgba: function (hex, opacity) {
        if (hex.indexOf("#") == -1) return hex; //如果是“red”格式的颜色值，则不转换。//正则错误，参考后面的PS内容
        var h = hex.charAt(0) == "#" ? hex.substring(1) : hex,
            r = parseInt(h.substring(0, 2), 16),
            g = parseInt(h.substring(2, 4), 16),
            b = parseInt(h.substring(4, 6), 16),
            a = opacity;
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    },
    watermarkInit: function () {
        this._canvas = document.getElementById("c4");
        this._cxt = this._canvas.getContext("2d");
        document.querySelectorAll(".TextPosition input").forEach(function (item, index) {
            if (index == 0) {
                item.checked = true
            } else {
                item.checked = false
            }
        });
        this._cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        this._cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
    },
    watermark: function (state) {
        this._canvas = document.getElementById("c4");
        this._cxt = this._canvas.getContext("2d");
        var cxt = this._cxt;
        // 绘制图片
        this._cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
        //获取用户输入
        var fontSize = document.getElementById('fontSize').value;
        var fontFamily = document.querySelector('.textFont').value;
        var text = document.getElementById('textMark').value;
        var fontStyle = document.getElementsByName('optFont')[1].checked;
        var fontWeight = document.getElementsByName('optFont')[0].checked;
        var position = Number(document.querySelector(".TextPosition input[type='radio']:checked").value);
        var pic_x = this._canvas.width;
        var pic_y = this._canvas.height;
        switch (position) {
            case 0:
                pic_x = pic_x / 2 - (Number(fontSize) * (text.length / 2));
                pic_y = pic_y / 2;
                break;
            case 1:
                pic_x = 0;
                pic_y = Number(fontSize);
                break;
            case 2:
                pic_x = pic_x - (Number(fontSize) * text.length);
                pic_y = Number(fontSize);
                break;
            case 3:
                pic_x = 0;
                pic_y = pic_y - 5;
                break;
            case 4:
                pic_x = pic_x - (Number(fontSize) * text.length);
                pic_y = pic_y - 5;
                break;
            default:
                pic_x = pic_x / 2 - (Number(fontSize) * (text.length / 2));
                pic_y = pic_y / 2;
        }
        // 绘制水印
        if (fontStyle) {
            fontStyle = 'italic';
        } else {
            fontStyle = "";
        }
        if (fontWeight) {
            fontWeight = 600;
        } else {
            fontWeight = "";
        }
        var font = fontStyle + " " + fontWeight + " " + fontSize + "px" + " " + fontFamily;
        var color = document.querySelector(".colorPlugin").value;
        var textP = parseFloat(document.getElementById("fontTransparency").value);
        cxt.font = font; //font-style(normal italic oblique) font-variant font-weight font-size font-family;
        cxt.fillStyle = imgOptimize.brgba(color, textP); //颜色跟透明度
        cxt.fillText(text, pic_x, pic_y); //水印内容
        if (state) {
            var imageData = this._cxt.getImageData(0, 0, this._canvas.width, this._canvas.height);
            for (var i = 0; i < imageData.data.length; i += 4) {
                // 当该像素是透明的，则设置成白色   
                if (imageData.data[i + 3] == 0) {
                    imageData.data[i] = 255;
                    imageData.data[i + 1] = 255;
                    imageData.data[i + 2] = 255;
                    imageData.data[i + 3] = 255;
                }
            }
            this._cxt.putImageData(imageData, 0, 0);
            var url = this._canvas.toDataURL("image/png"); //图片地址
            imgOptimize._img.src = url;
        }
    },
    labelInit: function () {
        this._canvas = document.getElementById("c5");
        this._cxt = this._canvas.getContext("2d");

        this._cxt.globalAlpha = 1.0;
        this._cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        this._cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
    },
    label: function (state, url) {
        // var lcanvas = document.getElementById("c5");
        // var cxt = lcanvas.getContext("2d");
        this._cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        //cxt.clearRect(0, 0, lcanvas.width, lcanvas.height); //先清掉画布上的内容
        // 绘制图片
        this._cxt.globalAlpha = 1.0;
        this._cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
        var images = new Image();
        images.src = document.getElementById("uploadimag").src; //上传的标签
        this._cxt.globalCompositeOperation = "source-over";
        var position = Number(document.querySelector(".PicPosition input[type='radio']:checked").value);
        var pic_x = this._canvas.width;
        var pic_y = this._canvas.height;
        var zoom = document.querySelector(".PicSize").value;
        var waterAdj = document.querySelector(".PicAdjustType input[type='radio']:checked").value;
        if (zoom != undefined && waterAdj == 1) {
            var width_x = Number(document.getElementById("uploadimag").width) / zoom;
            var height_y = Number(document.getElementById("uploadimag").height) / zoom;
        } else {
            width_x = 300;
            height_y = 300;
        }
        switch (position) {
            case 0:
                pic_x = pic_x / 2 - width_x / 2;
                pic_y = pic_y / 2 - height_y / 2;
                break;
            case 1:
                pic_x = 0;
                pic_y = 0;
                break;
            case 2:
                pic_x = pic_x - width_x;
                pic_y = 0;
                break;
            case 3:
                pic_x = 0;
                pic_y = pic_y - height_y;
                break;
            case 4:
                pic_x = pic_x - width_x;
                pic_y = pic_y - height_y;
                break;
            default:
                pic_x = pic_x / 2 - width_x;
                pic_y = pic_y / 2 - height_y;
        }
        this._cxt.globalAlpha = parseFloat(document.querySelector(".PicTransparency").value);
        images.onload = function () {
            imgOptimize._cxt.drawImage(images, pic_x, pic_y, width_x, height_y);
            if (state) {
                var imageData = imgOptimize._cxt.getImageData(0, 0, imgOptimize._canvas.width, imgOptimize._canvas.height);
                for (var i = 0; i < imageData.data.length; i += 4) {
                    // 当该像素是透明的，则设置成白色   
                    if (imageData.data[i + 3] == 0) {
                        imageData.data[i] = 255;
                        imageData.data[i + 1] = 255;
                        imageData.data[i + 2] = 255;
                        imageData.data[i + 3] = 255;
                    }
                }
                imgOptimize._cxt.putImageData(imageData, 0, 0);
                imgOptimize._img.src = imgOptimize._canvas.toDataURL("image/png");
            }
        };

    },
    colorInit: function () {
        this._canvas = document.getElementById("c7");
        this._cxt = this._canvas.getContext("2d");
        //获取canvas中的画图环境
        this._cxt.clearRect(0, 0, this._canvas.width, this._canvas.height); //先清掉画布上的内容
        this._cxt.drawImage(this._img, this._img_X, this._img_Y, this._imgWidth, this._imgHeight); //绘制图片
        document.getElementById("original").setAttribute('selected', 'selected');
    },
    color: function (state) {
        var tempcanvas = document.getElementById("c7");
        var tempcontext = this._canvas.getContext('2d');

        //获取ImageData的属性：width，height，data（包含 R G B A 四个值）；
        var imgdata = this._cxt.getImageData(0, 0, tempcanvas.width, tempcanvas.height);
        var filter = document.querySelector("#filter input[type='radio']:checked").value;
        if (!state) {
            switch (filter) {
                case 'moriGirl':
                    imgOptimize.moriGirl(imgdata);
                    break;
                case 'occident':
                    imgOptimize.occident(imgdata);
                    break;
                case 'koreaJapan':
                    imgOptimize.koreaJapan(imgdata);
                    break;
                case 'unripe':
                    imgOptimize.unripe(imgdata);
                    break;
                case 'personality':
                    imgOptimize.personality(imgdata);
                    break;
                case 'dusk':
                    imgOptimize.dusk(imgdata);
                    break;
                case 'dawn':
                    imgOptimize.dawn(imgdata);
                    break;
                case 'childhoodMemories':
                    imgOptimize.childhoodMemories(imgdata);
                    break;
                case 'nostalgic':
                    imgOptimize.nostalgic(imgdata);
                    break;
                case 'pure':
                    imgOptimize.pure(imgdata);
                    break;
                default:
                    imgOptimize.colorInit();
            }
        }
        //将图像信息绘制第二个canvas中
        tempcontext.putImageData(imgdata, 0, 0);
        if (state) {
            var imageData = this._cxt.getImageData(0, 0, this._canvas.width, this._canvas.height);
            for (var i = 0; i < imageData.data.length; i += 4) {
                // 当该像素是透明的，则设置成白色   
                if (imageData.data[i + 3] == 0) {
                    imageData.data[i] = 255;
                    imageData.data[i + 1] = 255;
                    imageData.data[i + 2] = 255;
                    imageData.data[i + 3] = 255;
                }
            }
            this._cxt.putImageData(imageData, 0, 0);
            var url = this._canvas.toDataURL("image/png"); //图片地址
            imgOptimize._img.src = url;
        }
    },
    uploadImg: function () {
        var _this = this;
        var d = _this._img.src;
        if (d.indexOf('data:image') != -1) {
            //ZENG.msgbox.loading("正在保存优化后的图片...");
            d = d.replace(/^data:image\/(png|jpg);base64,/, "");
            // var savebase64img = JSON.parse(SaveUploadImg(d, 0));
            // if (savebase64img.success == 1) {
            //     var imgPath = savebase64img.path;
            //     imgOptimize.$imgObj.attr("src", imgPath);
            //     $("#pic_meihua").modal("hide");
            // }
            // //ZENG.msgbox.hide();
            // var picId = imgOptimize.$imgObj.parent().parent().find("input[type='file']").attr("id");
            // window.external.SetPicUrl(picId, imgPath);
            //return;
        }
    },
    moriGirl: function (imgdata) {
        for (var i = 0; i < imgdata.data.length; i += 4) {
            //绿色滤镜的算法：当前绿色通道值G*1.4得到绿色滤镜
            var g = imgdata.data[i + 1] * 1.05;
            var a = imgdata.data[i + 3] * 0.95;
            //注：当前值大于255时将其赋值255
            imgdata.data[i + 3] = a > 255 ? 255 : a;
            imgdata.data[i + 1] = g > 255 ? 255 : g;
        }
    },
    occident: function (imgdata) {
        for (var i = 0; i < imgdata.data.length; i += 4) {
            //蓝色滤镜的算法：当前蓝色通道值变为原来的1.6得到蓝色滤镜
            var b = imgdata.data[i + 2] * 1.05;
            var a = imgdata.data[i + 3] * 0.95;
            //注：当前值大于255时将其赋值255
            imgdata.data[i + 2] = b > 255 ? 255 : b;
            imgdata.data[i + 3] = a > 255 ? 255 : a;
        }
    },
    koreaJapan: function (imgdata) {
        for (var i = 0; i < imgdata.data.length; i += 4) {
            //红色滤镜的算法：当前红色通道值变为原来的2得到红色滤镜
            var r = imgdata.data[i] * 1.1;
            var b = imgdata.data[i + 1] + 4;
            var a = imgdata.data[i + 3] * 0.95;
            //注：当前值大于255时将其赋值255
            imgdata.data[i + 3] = a > 255 ? 255 : a;
            //注：当前值大于255时将其赋值255
            imgdata.data[i] = r > 255 ? 255 : r;

        }
    },
    unripe: function (imgdata) {
        for (var i = 0; i < imgdata.data.length; i += 4) {
            //青色滤镜的算法：绿色通道值和蓝色通道值增加50（绿色+蓝色 = 青色）
            var g = imgdata.data[i + 1] + 10;
            var b = imgdata.data[i + 2] + 10
            //注：当前值大于255时将其赋值255
            imgdata.data[i + 1] = g > 255 ? 255 : g;
            imgdata.data[i + 2] = b > 255 ? 255 : b;
        }
    },
    nostalgic: function (imgdata) {
        for (var x = 0; x < imgdata.width; x++) {
            for (var y = 0; y < imgdata.height; y++) {

                // Index of the pixel in the array  
                var idx = (x + y * imgdata.width) * 4;
                var r = imgdata.data[idx + 0];
                var g = imgdata.data[idx + 1];
                var b = imgdata.data[idx + 2];
                if (r == 0 && g == 0 && b == 0) {
                    continue;
                }
                var dr = .393 * r + .769 * g + .189 * b;
                var dg = .349 * r + .686 * g + .168 * b;
                var db = .272 * r + .534 * g + .131 * b;
                var scale = Math.random() * 0.5 + 0.5;
                var fr = scale * dr + (1 - scale) * r;
                scale = Math.random() * 0.5 + 0.5;
                var fg = scale * dg + (1 - scale) * g;
                scale = Math.random() * 0.5 + 0.5;
                var fb = scale * db + (1 - scale) * b;
                imgdata.data[idx + 0] = fr; // Red channel  
                imgdata.data[idx + 1] = fg; // Green channel  
                imgdata.data[idx + 2] = fb; // Blue channel  
                imgdata.data[idx + 3] = 255; // Alpha channel   
                // add black border  
            }
        }
    },
    childhoodMemories: function (imgdata) {
        for (var x = 0; x < imgdata.width; x++) {
            for (var y = 0; y < imgdata.height; y++) {

                // Index of the pixel in the array  
                var idx = (x + y * imgdata.width) * 4;
                var r = imgdata.data[idx + 0];
                var g = imgdata.data[idx + 1];
                var b = imgdata.data[idx + 2];
                if (r == 0 && g == 0 && b == 0) {
                    continue;
                }
                var rand = Math.floor(Math.random() * 10) % 3;
                var idx2 = (x + rand + (y + rand) * imgdata.width) * 4;
                var r2 = imgdata.data[idx2 + 0];
                var g2 = imgdata.data[idx2 + 1];
                var b2 = imgdata.data[idx2 + 2];
                var fr = r2;
                var fg = g2;
                var fb = b2;
                imgdata.data[idx + 0] = fr; // Red channel  
                imgdata.data[idx + 1] = fg; // Green channel  
                imgdata.data[idx + 2] = fb; // Blue channel  
                imgdata.data[idx + 3] = 255; // Alpha channel    
                // add black border  
            }
        }
    },
    dawn: function (imgdata) {
        for (var i = 0; i < imgdata.data.length; i += 4) {
            //黄色滤镜的算法：红色通道值和绿色通道值增加50（红色+绿色 = 黄色）
            var r = imgdata.data[i] + 8;
            var g = imgdata.data[i + 1] + 8
            //注：当前值大于255时将其赋值255
            imgdata.data[i] = r > 255 ? 255 : r;
            imgdata.data[i + 1] = g > 255 ? 255 : g;
        }
    },
    dusk: function (imgdata) {
        for (var i = 0; i < imgdata.data.length; i += 4) {
            //红色滤镜的算法：当前红色通道值变为原来的2得到红色滤镜
            var r = imgdata.data[i] * 1.1;
            //注：当前值大于255时将其赋值255
            imgdata.data[i] = r > 255 ? 255 : r;

        }
    },
    personality: function (imgdata) {
        for (var i = 0; i < imgdata.data.length; i += 4) {
            //紫色滤镜的算法：红色通道值和蓝色通道值增加50（红色+蓝色 = 紫色）
            var r = imgdata.data[i] + 8;
            var b = imgdata.data[i + 2] + 8
            //注：当前值大于255时将其赋值255
            imgdata.data[i] = r > 255 ? 255 : r;
            imgdata.data[i + 2] = b > 255 ? 255 : b;
        }
    },
    pure: function (imgdata) {
        for (var i = 0; i < imgdata.data.length; i += 4) {
            var r = imgdata.data[i] + 20;
            var g = imgdata.data[i + 1] + 20;
            var b = imgdata.data[i + 2] + 20;
            //注：当前值大于255时将其赋值255
            imgdata.data[i] = r > 255 ? 255 : r;
            imgdata.data[i + 1] = g > 255 ? 255 : g;
            imgdata.data[i + 2] = b > 255 ? 255 : b;
        }
    }
}

export default imgOptimize;
