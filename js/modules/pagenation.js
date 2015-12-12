define(function(require, exports, module) {
	function Pagenation(data) {
		this.init(data)
		return this;
	}
	module.exports = Pagenation;
	Pagenation.prototype.init = function(data) {
		if (data) {
			this.$dom = $(data.dom) || $('.pages ol');
			this.max = data.max || parseInt($('.pages ol li').eq(-2).attr('data-num'));
			this.start = data.start || 1;
			this.btnNum = data.btnNum || 5;
			this.end = this.btnNum;
		} else {
			this.$dom = $('.pages ol');
			this.max = 10;
			this.start = 1;
			this.btnNum = 10;
			this.end = this.btnNum;
		}
	}
	Pagenation.prototype.getCur = function() {
		return parseInt(this.$dom.find('li.active').attr('data-num'), 10);
	}
	Pagenation.prototype.active = function(cur) {
		this.$dom.find('li[data-num="' + cur + '"]').addClass('active');
	}
	Pagenation.prototype.removeActive = function() {
		this.$dom.find('li.active').removeClass('active');
	}
	Pagenation.prototype.update = function(cur) {
		if (cur > this.max) cur = this.max;
		var lis = '<li data-num="-1" ><a href="javascript:void(0);">&lt;</a></li>';
		if (cur > this.start + this.btnNum / 2) {
			console.log(cur + parseInt(this.btnNum / 2) - 1)
			this.end = (cur + parseInt(this.btnNum / 2) - 1) < this.max ? (cur + parseInt(this.btnNum / 2) - 1) : this.max;
			this.start = (this.end-this.btnNum+1);
			for (var i = this.start; i <= this.end; i++) {
				lis += '<li data-num="' + i + '"><a href="javascript:void(0);">' + i + '</a></li>';
			}
		} else {
			this.start = (cur - parseInt(this.btnNum / 2)) > 1 ? (cur - parseInt(this.btnNum / 2)) : 1;
//			this.end = (this.start+this.btnNum) < this.max ? (cur + parseInt(this.btnNum / 2) - 1) : this.max;
			this.end = (this.start+this.btnNum-1) < this.max ? (this.start+this.btnNum-1) : this.max;
			for (var i = this.start; i <= this.end; i++) {
				lis += '<li data-num="' + i + '"><a href="javascript:void(0);">' + i + '</a></li>';
			}
		}
		lis += '<li data-num="-2"><a href="javascript:void(0);">&gt;</a></li>';
		this.$dom.html(lis);
		this.$dom.find('li[data-num="' + cur + '"]').addClass('active');
	}

	Pagenation.prototype.bind = function(callback){
		this.$dom.unbind('click.pagenation');
		var $ol = this.$dom;
		(function(callback){
			$ol.on('click.pagenation','li',function(){
				var $this = $(this);
				if ($this.hasClass('active')) {
					return;
				}
				var num = parseInt($this.attr('data-num'), 10);
				if (num == -3) {
					return;
				} else {
					var cur = pages.getCur();
					if (num == -1) {
						if (cur > 1) {
							pages.removeActive();
							cur--;
						}
					} else if (num == -2) {
						if (cur < pages.max) {
							pages.removeActive();
							cur++;
						}
					} else {
						cur = parseInt(num, 10);
						pages.removeActive();
					}
					callback(cur);
				}
			})
		})(callback)
	}
});