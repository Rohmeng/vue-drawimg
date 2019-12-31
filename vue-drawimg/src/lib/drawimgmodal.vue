<template>
  <div class="modal-backdrop" v-show="isShow">
    <div class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title">{{title}}</span>
        </div>
        <div class="modal-body">
          <div class="optimize">
            <ul class="optimize-menu">
              <li
                data-type="turn"
                :class="{active: menuActive=='turn'}"
                @click="optmenuClick('turn')"
              >翻转</li>
              <li
                data-type="rotate"
                :class="{active: menuActive=='rotate'}"
                @click="optmenuClick('rotate')"
              >旋转</li>
              <li
                data-type="cut"
                :class="{active: menuActive=='cut'}"
                @click="optmenuClick('cut')"
              >裁剪</li>
              <li
                data-type="watermark"
                :class="{active: menuActive=='watermark'}"
                @click="optmenuClick('watermark')"
              >水印</li>
              <li
                data-type="label"
                :class="{active: menuActive=='label'}"
                @click="optmenuClick('label')"
              >标签</li>
              <li
                data-type="color"
                :class="{active: menuActive=='color'}"
                @click="optmenuClick('color')"
              >颜色</li>
            </ul>
            <div class="optimize-content" data-type="turn" :class="{active: menuActive=='turn'}">
              <div class="optimize-show">
                <div class="opt-scale-two">
                  <canvas id="c2" width="800" height="800"></canvas>
                </div>
              </div>
              <div class="optimize-aside pf20">
                <h5 class="optimize-title">翻转</h5>
                <span class="opt-icon-btn" id="btn-flip-h" @click="imgOptimize.horizontalFlip();">水平</span>
                <span class="opt-icon-btn" id="btn-flip-v" @click="imgOptimize.verticalFlip();">垂直</span>
                <div class="block-center">
                  <button
                    type="button"
                    class="btn opt-button"
                    id="btn-flip-save"
                    @click="imgOptimize.saveFlip();"
                  >确定</button>
                  <button
                    type="button"
                    class="btn btn-default"
                    id="btn-flip-reset"
                    @click="imgOptimize.resetFlip();"
                  >重置</button>
                </div>
                <div class="block-center" id="flip-msg"></div>
              </div>
            </div>
            <div
              class="optimize-content"
              data-type="rotate"
              :class="{active: menuActive=='rotate'}"
            >
              <div class="optimize-show">
                <div class="opt-scale-two">
                  <canvas id="c1" width="800" height="800"></canvas>
                </div>
              </div>
              <div class="optimize-aside pf20">
                <h5 class="optimize-title">旋转</h5>
                <span
                  class="opt-icon-btn"
                  id="btn-rotate-left"
                  @click="imgOptimize.leftRotate();"
                >左转</span>
                <span
                  class="opt-icon-btn"
                  id="btn-rotate-right"
                  @click="imgOptimize.rightRotate();"
                >右转</span>
                <div class="block-center">
                  <button
                    type="button"
                    class="btn opt-button"
                    id="btn-rotate-save"
                    @click="imgOptimize.saveRotate();"
                  >确定</button>
                  <button
                    type="button"
                    class="btn btn-default"
                    id="btn-rotate-reset"
                    @click="imgOptimize.resetRotate();"
                  >重置</button>
                </div>
                <div class="block-center" id="rotate-msg"></div>
              </div>
            </div>
            <div class="optimize-content" data-type="cut" :class="{active: menuActive=='cut'}">
              <div class="optimize-show">
                <img id="i3" />
                <div class="opt-cut-bg"></div>
                <div
                  id="choose_box"
                  style="width: 350px; height: 350px;border:1px solid #ff6000;position: absolute; left: 0px; top: 0px; z-index: 1000; cursor: move;overflow:hidden;"
                >
                  <img id="i3_1" style="height:350px;width:350px;margin-left:0px;margin-top:0px;" />
                  <span class="corner-left-top"></span>
                  <span class="corner-left-bottom"></span>
                  <span class="corner-right-top"></span>
                  <span class="corner-right-bottom"></span>
                  <span class="border-hori-one"></span>
                  <span class="border-hori-two"></span>
                  <span class="border-verti-one"></span>
                  <span class="border-verti-two"></span>
                </div>
              </div>
              <div class="optimize-aside pf20">
                <h5 class="optimize-title">裁剪</h5>
                <label class="opt-label" style="display:block;width:100%;">比例：</label>
                <div class="opt-ul-btn" id="btn-img-bl">
                  <span data-value="1" class="active">1:1</span>
                  <span data-value="2">3:4</span>
                  <span data-value="3">4:3</span>
                  <span data-value="4">9:16</span>
                  <span data-value="5">16:9</span>
                </div>
                <div class="block-center">
                  <button
                    type="button"
                    id="btn-cut-save"
                    @click="imgOptimize.cut();"
                    class="btn opt-button cut-save"
                  >确定裁剪</button>
                </div>
                <div class="block-center" id></div>
              </div>
            </div>
            <div
              class="optimize-content"
              data-type="watermark"
              :class="{active: menuActive=='watermark'}"
            >
              <div class="optimize-show">
                <div class="opt-scale-two">
                  <canvas id="c4" width="800" height="800"></canvas>
                </div>
              </div>
              <div class="optimize-aside">
                <h5 class="optimize-title pf20">水印</h5>
                <div class="opt-controls">
                  <label class="opt-label" style="font-weight:normal">文字：</label>
                  <input
                    type="text"
                    class="optimize-input"
                    id="textMark"
                    value
                    @change="imgOptimize.watermark();"
                  />
                </div>
                <div class="opt-controls">
                  <label class="opt-label" style="font-weight:normal">字体：</label>
                  <select class="optimize-input textFont" @change="imgOptimize.watermark();">
                    <option value="FangSong" dir="ltr">仿宋</option>
                    <option value="STZhongsong" dir="ltr">华文中宋</option>
                    <option value="STFangsong" dir="ltr">华文仿宋</option>
                    <option value="STCaiyun" dir="ltr">华文彩云</option>
                    <option value="STXinwei" dir="ltr">华文新魏</option>
                    <option value="STXihei" dir="ltr">华文细黑</option>
                    <option value="STXingkai" dir="ltr">华文行楷</option>
                    <option value="SimSun" dir="ltr">宋体</option>
                    <option value="STSong" dir="ltr">宋体-方正</option>
                    <option value="YouYuan" dir="ltr">幼圆</option>
                    <option value="Microsoft Yahei" dir="ltr">微软雅黑</option>
                    <option value="NSimSun" dir="ltr">新宋体</option>
                    <option value="FZYaoti" dir="ltr">方正姚体</option>
                    <option value="FZShuTi" dir="ltr">方正舒体</option>
                    <option value="KaiTi" dir="ltr">楷体</option>
                    <option value="LiSu" dir="ltr">隶书</option>
                    <option value="SimHei" dir="ltr">黑体</option>
                    <option value="WingDings" dir="ltr">WingDings</option>
                    <option value="Times New Roman" dir="ltr">Times New Roman</option>
                  </select>
                </div>
                <div class="opt-controls">
                  <label class="opt-label" style="font-weight:normal">大小：</label>
                  <input
                    type="range"
                    class="optimize-input"
                    id="fontSize"
                    min="12"
                    max="100"
                    style="padding-left:0px"
                    @change="imgOptimize.watermark();"
                  />
                  <label class="opt-label" style="font-weight:normal">透明度：</label>
                  <input
                    type="range"
                    class="optimize-input"
                    id="fontTransparency"
                    step="0.1"
                    min="0.3"
                    max="1.0"
                    value="1.0"
                    style="padding-left:0px"
                    @change="imgOptimize.watermark();"
                  />
                </div>
                <div class="opt-controls">
                  <label class="opt-label" style="font-weight:normal">样式：</label>
                  <div class="opt-input-box" id="txtFontStyle">
                    <label class="opt-checkbox">
                      <input
                        type="checkbox"
                        name="optFont"
                        value="粗体"
                        id="fontWeight"
                        @change="imgOptimize.watermark();"
                      />粗体
                    </label>
                    <label class="opt-checkbox">
                      <input
                        type="checkbox"
                        name="optFont"
                        value="斜体"
                        id="italic"
                        @change="imgOptimize.watermark();"
                      />斜体
                    </label>
                  </div>
                </div>
                <div class="opt-controls">
                  <label class="opt-label" style="font-weight:normal">颜色：</label>
                  <input
                    type="color"
                    class="optimize-input colorPlugin"
                    @change="imgOptimize.watermark();"
                  />
                </div>
                <div class="opt-controls">
                  <label class="opt-label" style="font-weight:normal">位置：</label>
                  <div class="opt-input-box TextPosition">
                    <label class="opt-checkbox">
                      <input
                        type="radio"
                        name="optPos"
                        value="0"
                        @change="imgOptimize.watermark();"
                        id="optpos"
                      />正中间
                    </label>
                    <label class="opt-checkbox">
                      <input
                        type="radio"
                        name="optPos"
                        value="1"
                        @change="imgOptimize.watermark();"
                      />左上角
                    </label>
                    <label class="opt-checkbox">
                      <input
                        type="radio"
                        name="optPos"
                        value="2"
                        @change="imgOptimize.watermark();"
                      />右上角
                    </label>
                    <label class="opt-checkbox">
                      <input
                        type="radio"
                        name="optPos"
                        value="3"
                        @change="imgOptimize.watermark();"
                      />左下角
                    </label>
                    <label class="opt-checkbox">
                      <input
                        type="radio"
                        name="optPos"
                        value="4"
                        @change="imgOptimize.watermark();"
                      />右下角
                    </label>
                  </div>
                </div>
                <div class="block-center">
                  <button
                    type="button"
                    class="btn opt-button"
                    id="textWaterMark"
                    @click="imgOptimize.watermark(true);"
                  >确定</button>
                  <button
                    type="button"
                    class="btn btn-default"
                    id="cancelWaterMark"
                    @click="cancelWaterMarkClick"
                  >还原</button>
                </div>
              </div>
            </div>
            <div class="optimize-content" data-type="label" :class="{active: menuActive=='label'}">
              <div class="optimize-show">
                <div class="opt-scale-two">
                  <canvas id="c5" width="800" height="800"></canvas>
                </div>
              </div>
              <div class="optimize-aside pf20">
                <h5 class="optimize-title">标签</h5>
                <div class="opt-controls">
                  <label class="opt-label" style="font-weight: normal;">上传：</label>
                  <img class="water-img" id="uploadimag" src style="display:none" />
                  <input id="fileinput" type="file" style="display:none" @change="labelImgChange($event)" />
                  <button
                    type="button"
                    class="optimize-input opt-btn"
                    id="fileinputtmp"
                    @click="selectWaterImg"
                  >选择水印照片</button>
                </div>
                <div class="opt-controls">
                  <label class="opt-label" style="font-weight:normal">透明度：</label>
                  <input
                    type="range"
                    class="optimize-input PicTransparency"
                    step="0.1"
                    min="0.1"
                    max="1.0"
                    value="1.0"
                    style="padding-left:0px"
                    @change="imgOptimize.label();"
                  />
                </div>
                <div class="opt-controls">
                  <label class="opt-label" style="font-weight:normal">位置：</label>
                  <div class="opt-input-box PicPosition">
                    <label class="opt-checkbox">
                      <input
                        type="radio"
                        name="optP"
                        value="0"
                        checked
                        @change="imgOptimize.label();"
                      />正中间
                    </label>
                    <label class="opt-checkbox">
                      <input type="radio" name="optP" value="1" @change="imgOptimize.label();" />左上角
                    </label>
                    <label class="opt-checkbox">
                      <input type="radio" name="optP" value="2" @change="imgOptimize.label();" />右上角
                    </label>
                    <label class="opt-checkbox">
                      <input type="radio" name="optP" value="3" @change="imgOptimize.label();" />左下角
                    </label>
                    <label class="opt-checkbox">
                      <input type="radio" name="optP" value="4" @change="imgOptimize.label();" />右下角
                    </label>
                  </div>
                </div>
                <div class="opt-controls">
                  <label class="opt-label" style="font-weight:normal">自动调整：</label>
                  <div class="PicAdjustType opt-input-box">
                    <label class="opt-checkbox">
                      <input
                        type="radio"
                        name="waterAdjust"
                        value="0"
                        checked
                        id="waterAdjust"
                        @change="imgOptimize.label();"
                      />自动合适大小
                    </label>
                    <br />
                    <label class="opt-checkbox">
                      <input
                        type="radio"
                        name="waterAdjust"
                        value="1"
                        @change="imgOptimize.label();"
                      />原图的
                    </label>
                    <select
                      class="PicSize optimize-input"
                      style="width:70px;position:fixed"
                      @change="imgOptimize.label();"
                    >
                      <option value="2" id="picSize">1/4</option>
                      <option value="3">1/9</option>
                      <option value="4">1/16</option>
                      <option value="5">1/25</option>
                      <option value="6">1/36</option>
                    </select>
                  </div>
                </div>
                <div class="block-center">
                  <button
                    type="button"
                    class="btn opt-button"
                    id="addTip"
                    @click="imgOptimize.label(true);"
                  >确定</button>
                  <button
                    type="button"
                    class="btn btn-default"
                    id="picdelete"
                    @click="picdeleteClick"
                  >还原</button>
                </div>
              </div>
            </div>
            <div
              class="optimize-content"
              data-type="puzzle"
              :class="{active: menuActive=='puzzle'}"
            >
              <div class="optimize-show opt-puzzle">
                <div class="opt-scale" id="puzzleContainer"></div>
              </div>
              <div class="optimize-aside pf20">
                <h5 class="optimize-title">拼图</h5>
                <div id="optAsideBtn"></div>
                <div class="block-center">
                  <button type="button" class="btn opt-button" id="puzzleSave">确定</button>
                </div>
                <div class="block-center" id>使用说明：点击空白区域然后在右边图片列表选择图片。</div>
              </div>
              <div class="opt-puzzle-menu">
                <span class="opt-puzzle-btn puzzle-two active" data-type="two">
                  <i class="iconfont icon-gongge"></i>
                </span>
                <span class="opt-puzzle-btn puzzle-three" data-type="three">
                  <i class="iconfont icon-gongge1"></i>
                </span>
              </div>
            </div>
            <div class="optimize-content" data-type="color" :class="{active: menuActive=='color'}">
              <div class="optimize-show">
                <div class="opt-scale-two">
                  <canvas id="c7" width="800" height="800"></canvas>
                </div>
              </div>
              <div class="optimize-aside pf20">
                <h5 class="optimize-title">颜色</h5>
                <div class="bt" id="filter">
                  <span>
                    <input
                      type="radio"
                      value="original"
                      name="filter"
                      id="original"
                      @click="imgOptimize.colorInit();"
                    />
                    <label for="original" style="cursor:pointer">基础</label>
                  </span>
                  <span style="margin-left:33px">
                    <input
                      type="radio"
                      value="pure"
                      name="filter"
                      id="pure"
                      @click="colorItemClick"
                    />
                    <label for="pure" style="cursor:pointer">经典-清纯</label>
                  </span>
                  <br />
                  <span>
                    <input
                      type="radio"
                      value="moriGirl"
                      name="filter"
                      id="moriGirl"
                      @click="colorItemClick"
                    />
                    <label for="moriGirl" style="cursor:pointer">经典-牛仔</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      value="occident"
                      name="filter"
                      id="occident"
                      @click="colorItemClick"
                    />
                    <label for="occident" style="cursor:pointer">经典-恬淡</label>
                  </span>
                  <br />
                  <span>
                    <input
                      type="radio"
                      value="koreaJapan"
                      name="filter"
                      id="koreaJapan"
                      @click="colorItemClick"
                    />
                    <label for="koreaJapan" style="cursor:pointer">经典-帅气</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      value="unripe"
                      name="filter"
                      id="unripe"
                      @click="colorItemClick"
                    />
                    <label for="unripe" style="cursor:pointer">经典-青涩</label>
                  </span>
                  <br />
                  <span>
                    <input
                      type="radio"
                      value="personality"
                      name="filter"
                      id="personality"
                      @click="colorItemClick"
                    />
                    <label for="personality" style="cursor:pointer">经典-个性</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      value="dusk"
                      name="filter"
                      id="dusk"
                      @click="colorItemClick"
                    />
                    <label for="dusk" style="cursor:pointer">光晕-黄昏</label>
                  </span>
                  <br />
                  <span>
                    <input
                      type="radio"
                      value="dawn"
                      name="filter"
                      id="dawn"
                      @click="colorItemClick"
                    />
                    <label for="dawn" style="cursor:pointer">光晕-晨光</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      value="childhoodMemories"
                      name="filter"
                      id="childhoodMemories"
                      @click="colorItemClick"
                    />
                    <label for="childhoodMemories" style="cursor:pointer">童年记忆</label>
                  </span>
                  <br />
                  <span>
                    <input
                      type="radio"
                      value="nostalgic"
                      name="filter"
                      id="nostalgic"
                      @click="colorItemClick"
                    />
                    <label for="nostalgic" style="cursor:pointer">怀旧</label>
                  </span>
                </div>
                <div class="block-center">
                  <button
                    class="btn opt-button adj-reset"
                    id="addFilter"
                    @click="imgOptimize.color(true);"
                  >确定</button>
                  <button class="btn btn-default" id="cancelFilter" @click="cancelFilterClick">还原</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            v-if="showCancle"
            class="btn modal-cancel"
            @click="cancelClick"
          >{{cancleText}}</button>
          <button
            type="button"
            class="btn btn-primary modal-comfirm"
            id="btnOptimizeImg"
            @click="confirmClick"
          >{{confirmText}}</button>
          <input type="hidden" id="imgedited" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import imgOptimize from "./drawimg.js";
export default {
  name: "drawimgmodal",
  props: {
    // midal标题
    title: {
      type: String,
      default: "图片优化"
    },
    isShow: {
      type: Boolean,
      default: false
    },
    // 是否显示取消按钮
    showCancle: {
      type: Boolean,
      default: true
    },
    // 确认按钮文字
    confirmText: {
      type: String,
      default: "确认"
    },
    // 取消按钮文字
    cancleText: {
      type: String,
      default: "关闭"
    }
  },
  data() {
    return {
      menuActive: "turn",
      imgOptimize: imgOptimize,
      typeTurn: true
    };
  },
  mounted: function() {},
  methods: {
    openOptimg(src) {
      this.imgOptimize.init();
      this.imgOptimize.open(src);
    },
    // 关闭按钮事件
    cancelClick() {
      this.$emit("showChange", false);
    },
    // 确定按钮事件
    confirmClick() {
      this.$emit("updateImg", this.imgOptimize._img.src);
    },
    optmenuClick(type) {
      this.menuActive = type;
      if (type == "rotate") {
        this.imgOptimize.rotateInit();
      } else if (type == "turn") {
        this.imgOptimize.flipInit();
      } else if (type == "cut") {
        this.imgOptimize.cutInit();
      } else if (type == "watermark") {
        this.imgOptimize.watermarkInit();
      } else if (type == "label") {
        this.imgOptimize.labelInit();
      } else if (type == "color") {
        this.imgOptimize.colorInit();
      } else if (type == "puzzle") {
        //imgOptimize.puzzleInit();
      }
    },
    cancelWaterMarkClick() {
      this.imgOptimize.watermarkInit();
      document.getElementById("textMark").value = "";
      document.getElementById("fontSize").value = 50;
      document.querySelector(".textFont option").setAttribute("selected", "selected");
      document.getElementById("fontTransparency").value = 1.0;
      document.getElementById("fontWeight").setAttribute("checked", "checked");
      document.getElementById("italic").setAttribute("checked", "checked");
      document.querySelector(".colorPlugin").value = "000";

      document
        .querySelectorAll(".TextPosition input")
        .forEach(function(item, index) {
          if (index == 0) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
    },
    labelImgChange(e) {
      var file = e.target.files[0],
        URL = window.webkitURL || window.URL,
        url = URL.createObjectURL(file);
      document.getElementById("uploadimag").src = url;
      this.imgOptimize.label();
    },
    picdeleteClick() {
      this.imgOptimize.labelInit();
      document
        .querySelectorAll(".PicPosition input")
        .forEach(function(item, index) {
          if (index == 0) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
      document.getElementById("fileinput").value = "";
      document.getElementById("fileinput").value = "";
      document.getElementById("uploadimag").src = "";
      document.querySelector(".PicTransparency").value = 1.0;
      document
        .querySelectorAll(".PicAdjustType input")
        .forEach(function(item, index) {
          if (index == 0) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
      document.querySelector(".PicSize option").setAttribute("selected", "selected");
    },
    cancelFilterClick() {
      this.imgOptimize.colorInit();
      document.querySelectorAll("#filter input").forEach(function(item, index) {
        if (index == 0) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
    },
    colorItemClick() {
      this.imgOptimize.colorInit();
      this.imgOptimize.color();
    },
    selectWaterImg() {
      document.getElementById("fileinput").click();
    }
  }
};
</script>
<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999;
  transition: opacity 0.15s linear;
}
.modal {
  min-width: 700px;
  min-height: 600px;
  padding: 10px;
  border-radius: 5px;
  overflow-x: hidden;
  overflow-y: auto;
}
.modal-content {
  position: relative;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid #999;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  outline: 0;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
}

.modal-header {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding: 0px 15px;
  font-weight: 500;
  border-bottom: 1px solid #eee;
}
.modal-body {
  border-bottom: 1px solid #eee;
}
.modal-footer {
  padding: 15px;
  text-align: right;
}
.modal-cancel {
  width: 70px;
  height: 35px;
  margin-right: 20px;
  cursor: pointer;
}
.modal-comfirm {
  width: 70px;
  height: 35px;
  cursor: pointer;
}

img {
  border: 0px;
}

input {
  outline: none;
}

.margin-tb,
.optimize-aside .optimize-title {
  margin-top: 0;
  margin-bottom: 0;
}

::-moz-selection,
::-webkit-keygen-select,
::selection {
  background-color: #6998ff;
  color: #fff;
}

.optimize {
  font-size: 14px;
  color: #575757;
  width: 753px;
  min-height: 450px;
  display: flex;
}

.optimize:before,
.optimize:after {
  content: "";
  display: table;
}

.optimize:after {
  clear: both;
}

.optimize-menu,
.optimize-content,
.optimize-show,
.optimize-aside,
.optimize-show-two {
  float: left;
}

.optimize-menu {
  width: 100px;
  height: auto;
  margin-right: 20px;
  list-style: none;
}

.optimize-menu li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0;
}

.optimize-menu li {
  width: 80px;
  height: 36px;
  line-height: 36px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  -ms-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  text-align: center;
}

.optimize-menu li:hover,
.optimize-menu li.active {
  cursor: pointer;
  border-color: #ff6000;
  color: #ff6000;
}

.optimize-menu li i {
  font-style: normal;
  font-size: 20px;
  margin-right: 5px;
  vertical-align: middle;
}

.optimize-content {
  display: none;
}

.optimize-content:before,
.optimize-content:after {
  content: "";
  display: table;
}

.optimize-content:after {
  clear: both;
}

.optimize-content.active {
  display: block;
}

.optimize-show,
.optimize-show-two {
  width: 350px;
  height: 350px;
  overflow: hidden;
  position: relative;
}

.optimize-show-two {
  border: 1px solid #999;
  width: 352px;
  height: 352px;
}

.opt-scale,
.opt-scale-two,
.opt-scale-three {
  width: 800px;
  height: 800px;
  transform: scale(0.4375);
  transform-origin: 0 0;
  left: 0;
  top: 0;
  position: absolute;
}

.optimize-show img,
.optimize-show canvas {
  width: 100%;
  height: 100%;
}

.optimize-aside {
  width: 220px;
  height: auto;
}

.optimize-aside .optimize-title {
  font-size: 16px;
  display: block;
  margin-bottom: 15px;
}

.optimize-aside .opt-icon-btn {
  display: inline-block;
  width: 40px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ddd;
  text-align: center;
  cursor: pointer;
}

.opt-icon-btn + .opt-icon-btn {
  margin-left: 5px;
}

.opt-controls {
  line-height: 30px;
  margin-bottom: 5px;
}

.opt-controls:before,
.opt-controls:after {
  content: "";
  display: table;
}

.opt-controls:after {
  clear: both;
}

.opt-controls .opt-label {
  min-width: 60px;
  max-width: 70px;
  vertical-align: top;
  text-align: right;
}

.opt-controls .opt-label,
.opt-controls .opt-input-box {
  float: left;
}

.opt-controls .optimize-input {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ddd;
  padding-left: 10px;
}

.opt-controls .optimize-input.opt-btn {
  outline: none;
  text-align: center;
  padding: 0;
}

.opt-controls .optimize-input,
.opt-controls .opt-input-box {
  width: 140px;
}

.opt-checkbox {
  line-height: 22px;
  display: inline-block;
}

.opt-checkbox:nth-child(2n) {
  margin-left: 8px;
}

.opt-checkbox input[type="checkbox"] {
  margin-right: 5px;
}

.opt-checkbox input[type="radio"] {
  margin-right: 3px;
}

.opt-checkbox .optimize-input {
  width: 60px !important;
}

.opt-button {
  background-color: #ff6000;
  color: #fff;
  outline: none;
  border: 1px solid #ddd;
  margin-right: 10px;
  width: 50px;
  height: 30px;
  cursor: pointer;
}
.cut-save {
  width: 70px;
}
.btn.btn-default {
  outline: none;
  border: 1px solid #ddd;
  width: 50px;
  height: 30px;
  cursor: pointer;
}

.opt-button:hover,
.opt-button:focus {
  background-color: #ff7300;
}

.pl-10 {
  padding-left: 10px !important;
}

.opt-block {
  display: block !important;
}

.opt-puzzle-item {
  font-size: 0;
  width: 60px;
  height: 60px;
  display: inline-block;
  margin-bottom: 10px;
}

.opt-puzzle-item:nth-child(2n) {
  margin-left: 10px;
  margin-right: 30px;
}

.opt-puzzle-menu {
  clear: both;
  display: block;
  padding-top: 10px;
}

.opt-puzzle-btn {
  width: 40px;
  height: 40px;
  display: inline-block;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid transparent;
}

.opt-puzzle-btn .iconfont {
  background-color: #fff;
  font-size: 43px;
  margin-top: 7px;
  display: inline-block;
  color: #c3c0c0;
  margin-left: -2px;
}

.opt-puzzle-btn.active {
  border: 1px solid #ff6000;
}

.opt-puzzle-btn.active .iconfont {
  color: #ff6000;
}

.opt-puzzle-btn + .opt-puzzle-btn {
  margin-left: 8px;
}

.puzzle-item > span {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
  box-sizing: border-box;
  z-index: 99;
}

.puzzle-item {
  position: absolute;
  border: 2px solid transparent;
  overflow: hidden;
}

.puzzle-item.empty {
  border: 2px dashed #ddd;
}

.puzzle-item:hover,
.puzzle-item.active {
  border: 2px solid #ff6000;
}

.puzzle-two-left {
  width: 400px;
  height: 800px;
  left: 0;
  top: 0;
}

.puzzle-two-right {
  left: 400px;
  width: 400px;
  height: 800px;
}

.puzzle-three-one {
  width: 400px;
  height: 800px;
  left: 0;
  top: 0;
}

.puzzle-three-two {
  width: 400px;
  height: 400px;
  left: 400px;
  top: 0;
}

.puzzle-three-three {
  width: 400px;
  height: 400px;
  left: 400px;
  top: 400px;
}

.pf20 {
  padding-left: 20px !important;
}

.opt-ul-btn {
  width: 100%;
  margin-bottom: 10px;
}

.opt-ul-btn span {
  display: inline-block;
  width: 50px;
  height: 26px;
  font-size: 14px;
  line-height: 26px;
  text-align: center;
  border: 1px solid #ddd;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
}

.opt-ul-btn span:nth-child(3n) {
  margin-right: 0px;
}

.opt-ul-btn span:hover,
.opt-ul-btn span.active {
  color: #ff6000;
  border-color: #ff6000;
}

.opt-cut-bg {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  filter: alpha(opacity=50);
  position: absolute;
}

.corner-left-top,
.corner-left-bottom,
.corner-right-top,
.corner-right-bottom {
  width: 20px;
  height: 20px;
  background-color: transparent;
  position: absolute;
}

.corner-left-top {
  left: 2px;
  top: 2px;
  border-top: 2px solid #ff6000;
  border-left: 2px solid #ff6000;
}

.corner-left-bottom {
  left: 2px;
  bottom: 2px;
  border-bottom: 2px solid #ff6000;
  border-left: 2px solid #ff6000;
}

.corner-right-top {
  right: 2px;
  top: 2px;
  border-top: 2px solid #ff6000;
  border-right: 2px solid #ff6000;
}

.corner-right-bottom {
  right: 2px;
  bottom: 2px;
  border-right: 2px solid #ff6000;
  border-bottom: 2px solid #ff6000;
}

.border-hori-one,
.border-hori-two,
.border-verti-one,
.border-verti-two {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.6);
  position: absolute;
  z-index: 200;
  *zoom: 1;
  left: 0;
}

.border-hori-one {
  top: 33.33%;
}

.border-hori-two {
  top: 66.66%;
}

.border-verti-one,
.border-verti-two {
  top: 0;
  height: 100%;
  width: 1px;
}

.border-verti-one {
  left: 33.33%;
}

.border-verti-two {
  left: 66.66%;
}

.block-center {
  margin-top: 20px;
  text-align: center;
  width: 100%;
}

.helptext {
  margin-left: 140px;
  position: absolute;
  margin-top: -35px;
}
.white-content {
  width: 50%;
  float: left;
  height: auto;
}

.white-content.wc-40 {
  width: 43%;
}

.white-input li {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin: 0 5px 5px 0;
  cursor: pointer;
}

.white-input li:nth-child(4n) {
  margin-right: 0;
}

.white-input a {
  text-decoration: none;
}

.white-input img {
  width: 100%;
  height: 100%;
  border: none;
}

.white-input label {
  line-height: 24px;
}

.white-input input[type="radio"] {
  margin-left: 10px;
  margin-top: 6px;
  vertical-align: top;
}

.wc-preview-img {
  width: 402px;
  height: 402px;
  border: 1px solid #999;
  box-sizing: border-box;
  position: relative;
}

.wc-img-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wc-preview-img img,
.wc-preview-img canvas {
  display: inline-block;
  border: 0;
  transform: scale(0.5);
  transform-origin: 0 0;
  /*position:absolute;
        left:0;
        top:0;*/
}

.abs-white {
  background-color: #fff;
  position: absolute;
  z-index: 999;
  box-sizing: border-box;
}

.abs-white.abs-top {
  width: 100%;
  height: 20px;
  top: 0;
  left: 0;
  /*border-bottom: 1px dashed #999;*/
}

.abs-white.abs-left {
  width: 20px;
  height: 100%;
  top: 0;
  left: 0;
  /*border-right: 1px dashed #999;*/
}

.abs-white.abs-right {
  width: 20px;
  height: 100%;
  right: 0;
  top: 0;
  /*border-left:1px dashed #999;*/
}

.abs-white.abs-bottom {
  width: 100%;
  height: 20px;
  /*border-top: 1px dashed #999;*/
  right: 0;
  bottom: 0;
}

.abs-hide {
  display: none;
}

.model-pic-ul {
  border-bottom: 1px solid #a0a0a0;
  height: 27px;
  padding-left: 10px;
}

.model-pic-li {
  position: relative;
  border: 1px solid #a0a0a0;
  background-color: #f0f0ee;
  margin: 0 2px -1px 0;
  padding: 0 20px;
  float: left;
  line-height: 25px;
  text-align: center;
  color: #555555;
  cursor: pointer;
  font-size: 12px;
  width: 90px;
}

.model-pic-li-selected {
  border-bottom-color: white;
  background-color: white;
}

.model-pic-tab1,
.model-pic-tab2 {
  padding-left: 20px;
}

.begin-upload-img-loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 440px;
  height: 238px;
  background-color: white;
  text-align: center;
  padding-top: 10%;
  display: none;
}
.imgul li {
  float: left;
  margin-right: 10px;
}
.name-improve-align-center1 {
  margin-top: 35%;
}
.name-improve-align-center2 {
  margin-top: 10%;
}
</style>


