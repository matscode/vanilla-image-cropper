(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ImageCropper = require('./imagecrop.min.js');

var dimensions = null;
var is_active = false;
var img_c = null;

var onUpdateHandler = function (dim) {
  dimensions = dim;
};

var onCropHandler = function() {
  var img = new Image();
  img.src = img_c.crop('image/jpeg', 1);
  img.width = dimensions.w;
  img.height = dimensions.h;
  var target = document.querySelector('.preview');
  while(target.firstChild) {
    target.removeChild(target.firstChild)
  }
  target.appendChild(img);
};

var onCreateHandler = function() {
  if(is_active) { return; }

  new ImageCropper('.test-imagecrop', 'img.jpg', {
    update_cb: onUpdateHandler
  });
  destroy_btn.style.display = 'initial';
  create_btn.style.display = 'none';

  is_active = true;
};

var onDestroyHandler = function() {
  if(!is_active) { return; }

  img_c.destroy();
  destroy_btn.style.display = 'none';
  create_btn.style.display = 'initial';

  is_active = false;
};

var crop_btn = document.querySelector('.crop-button');
crop_btn.addEventListener('click', onCropHandler);

var create_btn = document.querySelector('.create-button');
create_btn.addEventListener('click', onCreateHandler);
create_btn.style.display = 'none';

var destroy_btn = document.querySelector('.destroy-button');
destroy_btn.addEventListener('click', onDestroyHandler);

img_c = new ImageCropper('.test-imagecrop', 'img.jpg', {
  min_crop_width: 100,
  min_crop_height: 150,
  mode: 'circular',
  fixed_size: true,
  update_cb: onUpdateHandler,
  create_cb: function(dim) {
    console.log('created - ', dim);
  },
  destroy_cb: function() {
    console.log('destroy');
  }
});
is_active = true;
},{"./imagecrop.min.js":2}],2:[function(require,module,exports){
"use strict";module.exports=function(){function e(e){var n=c.elements.source.getBoundingClientRect(),i=e.clientX-n.left,t=e.clientY-n.top;return{x:i<0?0:i>n.width?n.width:i,y:t<0?0:t>n.height?n.height:t}}function n(e,n,i,t,o){var s=o?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e);return n&&(s.className=n),t&&t.appendChild(s),Object.keys(i||{}).forEach(function(e){return s.setAttribute(e,i[e])}),s}function i(){var e=c.elements.source.style,n=e.width,i=e.height;n=parseInt(n),i=parseInt(i);var t=c.meta.dimensions;t.x<0&&(t.x=0,t.x2=t.w),t.y<0&&(t.y=0,t.y2=t.h),t.x2>n&&(t.x2=n,t.x=t.x2-t.w),t.y2>i&&(t.y2=i,t.y=t.y2-t.h),t.w=t.x2-t.x,t.h=t.y2-t.y;var o=t.x,s=t.x2,m=t.y,a=t.y2,d=t.w,r=t.h,h=.5*d,u=.5*r;c.elements.handles.style.top=m+"px",c.elements.handles.style.left=o+"px",c.elements.handles.style.right=~~(n-s)+"px",c.elements.handles.style.bottom=~~(i-a)+"px",c.elements.overlay.setAttribute("d","M 0 0 v "+i+" h "+n+" v "+-i+" H-0zM"+("square"===c.options.mode?o+" "+m+" h "+d+" v "+r+" h "+-d+" V "+-r+" z":o+.5*d+" "+(m+.5*r)+" m "+-h+",0 a "+h+", "+u+" 0 1,0 "+d+",0 a "+h+", "+u+" 0 1,0 "+-d+" ,0 z")),c.options.update_cb(t)}function t(n){n=e(n);var t=c.meta.dimensions;t.x=n.x-.5*t.w,t.y=n.y-.5*t.h,t.x2=n.x+.5*t.w,t.y2=n.y+.5*t.h,i()}function o(e){c.elements.source&&this.destroy(),c.elements.source=document.querySelector(e),c.elements.source.className.indexOf("imgc")===-1&&(c.elements.source.className+=" imgc")}function s(e){document.addEventListener("mousemove",m),document.addEventListener("mouseup",a),t(e)}function m(e){t(e)}function a(){document.removeEventListener("mouseup",a),document.removeEventListener("mousemove",m)}function d(t,o,s){function m(e){e.stopPropagation(),document.addEventListener("mouseup",d),document.addEventListener("mousemove",a)}function a(n){n.stopPropagation(),s(e(n)),i()}function d(e){e.stopPropagation(),document.removeEventListener("mouseup",d),document.removeEventListener("mousemove",a)}var r=n("span","imgc-handles-el-"+t+"-"+o);return r.addEventListener("mousedown",m),r}function r(e,n){var i=this,t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];n&&e&&(Object.keys(t||{}).forEach(function(e){return c.options[e]=t[e]}),c.options.min_crop_width>80&&(c.meta.dimensions.x2=c.meta.dimensions.w=c.options.min_crop_width),c.options.min_crop_height>80&&(c.meta.dimensions.y2=c.meta.dimensions.h=c.options.min_crop_height),c.options.fixed_size&&(c.options.min_crop_width>80||c.options.min_crop_height>80)&&(c.meta.dimensions.x2=c.meta.dimensions.y2=c.meta.dimensions.w=c.meta.dimensions.h=c.options.min_crop_width>c.options.min_crop_height?c.options.min_crop_width:c.options.min_crop_height),o.call(this,e),c.meta.img=new Image,c.meta.img.addEventListener("load",function(){return i.create()}),c.meta.img.src=n)}var c=Object.seal({$$initialized:!1,meta:{dimensions:{},img:null,ratio:{w:1,h:1}},elements:{source:null,overlay:null,handles:null},options:{update_cb:function(){},create_cb:function(){},destroy_cb:function(){},min_crop_width:32,min_crop_height:32,max_width:500,max_height:500,fixed_size:!1,mode:"square"}}),h=[function(e){var n=c.meta.dimensions.x;h[7](e),c.options.fixed_size?c.meta.dimensions.y+c.meta.dimensions.x-n<0?(c.meta.dimensions.x=n-c.meta.dimensions.y,c.meta.dimensions.y=0):c.meta.dimensions.y+=c.meta.dimensions.x-n:h[4](e)},function(e){var n=c.meta.dimensions.x2;h[5](e),c.options.fixed_size?c.meta.dimensions.y-c.meta.dimensions.x2+n<0?(c.meta.dimensions.x2=n+c.meta.dimensions.y,c.meta.dimensions.y=0):c.meta.dimensions.y-=c.meta.dimensions.x2-n:h[4](e)},function(e){var n=c.meta.dimensions.x2;if(h[5](e),c.options.fixed_size){var i=c.elements.source.getBoundingClientRect();c.meta.dimensions.y2+c.meta.dimensions.x2-n>i.height?(c.meta.dimensions.x2=n+(i.height-c.meta.dimensions.y2),c.meta.dimensions.y2=i.height):c.meta.dimensions.y2+=c.meta.dimensions.x2-n}else h[6](e)},function(e){var n=c.meta.dimensions.x;if(h[7](e),c.options.fixed_size){var i=c.elements.source.getBoundingClientRect();c.meta.dimensions.y2+(n-c.meta.dimensions.x)>i.height?(c.meta.dimensions.x=n-(i.height-c.meta.dimensions.y2),c.meta.dimensions.y2=i.height):c.meta.dimensions.y2-=c.meta.dimensions.x-n}else h[6](e)},function(e){return c.meta.dimensions.y=c.meta.dimensions.y2-e.y<c.options.min_crop_height?c.meta.dimensions.y2-c.options.min_crop_height:e.y},function(e){return c.meta.dimensions.x2=e.x-c.meta.dimensions.x<c.options.min_crop_width?c.meta.dimensions.x+c.options.min_crop_width:e.x},function(e){return c.meta.dimensions.y2=e.y-c.meta.dimensions.y<c.options.min_crop_height?c.meta.dimensions.y+c.options.min_crop_height:e.y},function(e){return c.meta.dimensions.x=c.meta.dimensions.x2-e.x<c.options.min_crop_width?c.meta.dimensions.x2-c.options.min_crop_width:e.x}];return r.prototype.create=function(e){if(!c.$$initialized){c.elements.source||o.call(this,e);var t=c.meta.img,m=t.width,a=t.height;m>c.options.max_width&&(a=~~(c.options.max_width*a/m),m=c.options.max_width),a>c.options.max_height&&(m=~~(c.options.max_height*m/a),a=c.options.max_height),c.meta.ratio={w:c.meta.img.naturalWidth/m,h:c.meta.img.naturalHeight/a},c.elements.source.style.width=m+"px",c.elements.source.style.height=a+"px",c.elements.source.addEventListener("DOMNodeRemovedFromDocument",this.destroy);var r=n("div","imgc-content",{},c.elements.source);r.appendChild(c.meta.img);var u=n("svg",null,{height:a,width:m},c.elements.source,!0);c.elements.overlay=n("path",null,{"fill-rule":"evenodd"},u,!0),c.elements.handles=n("div","imgc-handles imgc-handles-"+c.options.mode,{},c.elements.source);for(var l=0;l<(c.options.fixed_size?4:8);l++)c.elements.handles.appendChild(new d(c.options.fixed_size?0:~~(l/4),l%4,h[l]));c.elements.source.addEventListener("mousedown",s),c.$$initialized=!0,c.meta.dimensions={x:0,y:0,w:0,h:0},m===a?c.meta.dimensions.x2=c.meta.dimensions.y2=m:m>a?(c.meta.dimensions.x2=a,c.meta.dimensions.y2=c.options.fixed_size?a:a-(m-a)):a>m&&(c.meta.dimensions.x2=c.meta.fixed_size?m:m-(a-m),c.meta.dimensions.y2=m),i(),c.options.create_cb({w:m,h:a})}},r.prototype.destroy=function(){if(c.$$initialized){if(c.elements.source){for(c.elements.source.removeEventListener("DOMNodeRemovedFromDocument",void 0),c.elements.source.removeEventListener("mousedown",s);c.elements.source.firstChild;)c.elements.source.removeChild(c.elements.source.firstChild);c.elements.source=c.meta.img=c.elements.handles=c.elements.overlay=null}c.$$initialized=!1,c.options.destroy_cb&&c.options.destroy_cb()}},r.prototype.crop=function(){var e=arguments.length<=0||void 0===arguments[0]?"image/jpeg":arguments[0],i=arguments.length<=1||void 0===arguments[1]?1:arguments[1];e=["image/jpeg","image/png"].indexOf(e)!==-1?"image/jpeg":e,i=i<0||i>1?1:i;var t=c.meta.dimensions,o=t.x,s=t.y,m=t.w,a=t.h,d=n("canvas",null,{width:m,height:a});return d.getContext("2d").drawImage(c.meta.img,c.meta.ratio.w*o,c.meta.ratio.h*s,c.meta.ratio.w*m,c.meta.ratio.h*a,0,0,m,a),d.toDataURL(e,i)},r}();
},{}]},{},[1]);
