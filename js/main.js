// select video element
function videoScroller(){
	//settings
	var that = this,
		vid = document.getElementById('v0')
		pixelInterval = 150,
		changeinTime = 0,
		videoTime = 0, 
		newPosition = null,
		pTime = 0, 
		cTime = 0;
    this.getVideo = function() {
        return vid;
    }
    this.getPixelInterval = function() {
        return pixelInterval;
    }
    this.getChangeinTime = function() {
        return changeinTime;
    }
    this.setChangeinTime = function(t) {
        changeinTime = t;
    }
    this.getNewPosition = function() {
        return newPosition;
    }
    this.setNewPosition = function(pos) {
        newPosition = pos;
    }
    this.getVideoTime = function() {
        return videoTime;
    }
    this.setVideoTime = function(vt) {
        videoTime = vt;
    }
    this.setpTime = function(p) {
        pTime = p;
    }
    this.getpTime = function() {
        return pTime;
    }
    this.setcTime = function(c) {
        cTime = c;
    }
    this.getcTime = function() {
        return cTime;
    }
    var initInterval = setInterval(function(t){
		if (vid.readyState > 0) {
			that.init();
			clearInterval(initInterval);
		}
	},500);
	this.infiniteRun();
	window.onscroll = function(){
		if(!vid.playing){
			vid.pause();
		}
	}
};
videoScroller.prototype.init = function(){
	var v = this.getVideo();
	v.pause();
	v.playbackRate = 1;
	this.setVideoTime(window.pageYOffset / this.getPixelInterval());
	v.currentTime = this.getVideoTime();
	var setHeight = document.getElementById("set-height");
	setHeight.style.height = Math.floor(v.duration) * this.getPixelInterval() + "px";
};
videoScroller.prototype.checkScrollSpeed = function(){
	var delta = 0;
    if(this.getpTime() != 0){
    	this.setpTime(this.getcTime());
    	this.setcTime(new Date().getTime());
    	delta = this.getcTime() - this.getpTime();
    }else{
    	this.setpTime(new Date().getTime());
    }
    return delta;
};
videoScroller.prototype.infiniteRun = function(){
	var that = this;
	var v = this.getVideo();
	setInterval(function(){
		var v = that.getVideo();
		that.setNewPosition(window.pageYOffset/that.getPixelInterval());
		if(that.getNewPosition() > that.getVideoTime()){
			that.setChangeinTime(that.getNewPosition() - videoTime);
			v.playbackRate = ( that.checkScrollSpeed() / that.getChangeinTime()) * 100;
			that.setVideoTime(v.currentTime);
			if(!v.playing){
				v.play();
			}
		}else{
			v.pause();
			that.setChangeinTime(0);
			videoTime = v.currentTime;
		}
	}, 10);
};
$(function(){
	var scroller = new videoScroller();
});



