(function ($)
{
    $.fn.kinMaxShow = function (user_options)
    {
        var default_options = {
            height: 360,//控制图片高度
            intervalTime: 5, //焦点图切换间隔时间  秒
            switchTime: 800, //焦点图切换所需时间 毫秒
            easing: 'swing', //linear  swing 自带这两种切换效果
            imageAlign: 'center center',
            button: {
                switchEvent: 'click',
                showIndex: false,
                normal: {
                    width: '14px',
                    height: '14px',
                    lineHeight: '14px',
					borderRadius:'14px',
                    right: '20px',//个数小方块 里右边的距离
                    bottom: '15px',
                    fontSize: '10px',
                    background: "#333",
                    border: "1px solid #444",
                    color: "#fff",
                    textAlign: 'center',
                    marginRight: '8px',
                    fontFamily: "Verdana",
                    float: 'left'
                },
                focus: {
                    background: "#ff6600",
                    border: "0px solid #FF0000",
					border: "1px solid #f80",
                    color: "#fff"
					
                }
            },
            callback: function (index, action) { }
        };
        options = jQuery.extend(true, {}, default_options, user_options);
        var k = {};
        k.selector = $(this).selector;
        if ($(this).length > 1)
        {
            $.error('kinMaxShow error[More than one selected object]');
            return false;
        }
        k.self = this;
        k.index = 0;
        k.lindex = 0;
        k.size = $(k.self).children('div').size();
        k.prename = 'kinMaxShow_';
        k.data = {};
        k.fn = {};
        k.onload = function ()
        {
            $(k.self).css({
                width: '100%',
                height: options.height,
                overflow: 'hidden',
                position: 'relative'
            }).children('div').addClass(k.prename + 'image_item').hide();
            k.init();
        };
        k.init = function ()
        {
            k.setData();
            k.setLayout();
            k.setAnimate();
        };
        k.setData = function ()
        {
            k.data.title = new Array();
            $(k.self).children('div').each(function ()
            {
                k.data.title.push($(this).find('img').attr('alt'));
            })
        };
        k.setLayout = function ()
        {
            $(k.self).children('div').wrapAll('<div class="' + k.prename + 'image_box"></div>');
            $('.' + k.prename + 'image_item', k.self).each(function ()
            {
                var a = $(this).children('a');
                if (a.length)
                {
                    var image = a.children('img').attr('src');
                    a.children('img').remove();
                } else
                {
                    var image = $(this).children('img').attr('src');
                    $(this).children('img').remove();
                }
                $(this).css({
                    background: 'url(' + image + ') no-repeat center',
                    'z-index': 0
                });
            });
            $('.' + k.prename + 'image_item', k.self).eq(0).css('z-index', '1');
            if (options.button.normal.display != 'none')
            {
                var button_list = '';
                for (i = 1; i <= k.size; i++)
                {
                    if (options.button.showIndex)
                    {
                        button_list += '<li>' + i + '</li>';
                    } else
                    {
                        button_list += '<li> </li>';
                    }
                }
                $(k.self).append('<ul class="' + k.prename + 'button">' + button_list + '</ul>');
                $('.' + k.prename + 'button li', k.self).eq(0).addClass('focus');
            }
            k.setCSS();
            $('.' + k.prename + 'image_item:gt(0)', k.self).css('z-index', 0).css({
                opacity: 0
            });
            $('.' + k.prename + 'image_item', k.self).show();
            $(k.self).css({
                overflow: 'hidden',
                visibility: 'visible',
                display: 'block'
            });
        };
        k.setCSS = function ()
        {
            var cssCode = '<style type="text/css">';
            cssCode += k.selector + ' *{ margin:0;padding:0;} ';
            cssCode += k.selector + ' .' + k.prename + 'image_box{width:100%;height:' + parseInt(options.height) + 'px;position:relative;z-index:1;} ';
            cssCode += k.selector + ' .' + k.prename + 'image_box .' + k.prename + 'image_item{width:100%;height:' + parseInt(options.height) + 'px;position:absolute;overflow:hidden;} ';
            cssCode += k.selector + ' .' + k.prename + 'image_box .' + k.prename + 'image_item a{width:100%;height:' + parseInt(options.height) + 'px;display:block;text-decoration:none;padding:0;margin:0;background:transparent;text-indent:0;outline:none;hide-focus:expression(this.hideFocus=true);} ';
            if (options.button.normal.display != 'none')
            {
                cssCode += k.selector + ' .' + k.prename + 'button{' + k.fn.objToCss(options.button.normal, ['top', 'right', 'bottom', 'left'], true) + ';position:absolute;list-style:none;z-index:2;}';
                cssCode += k.selector + ' .' + k.prename + 'button li{' + k.fn.objToCss(options.button.normal, ['top', 'right', 'bottom', 'left']) + ';cursor:pointer;-webkit-text-size-adjust:none;}';
                cssCode += k.selector + ' .' + k.prename + 'button li.focus{' + k.fn.objToCss(options.button.focus, ['top', 'right', 'bottom', 'left']) + ';cursor:default;}';
            }
            cssCode += '</style>';
            $(k.self).prepend(cssCode);
        }
        k.setAnimate = function ()
        {
            options.callback.call($('.' + k.prename + 'image_item:eq(' + k.index + ')', k.self), k.index, 'fadeIn');
            var overDelayTimer;
            $('.' + k.prename + 'button', k.self).delegate('li', options.button.switchEvent, function ()
            {
                _this = this;

                function setChange()
                {
                    k.index = $(_this).index();
                    k.setOpacity();
                }
                if (options.button.switchEvent == 'mouseover')
                {
                    overDelayTimer = setTimeout(setChange, 200);
                } else
                {
                    setChange();
                }
            })
            if (options.button.switchEvent == 'mouseover')
            {
                $('.' + k.prename + 'button', k.self).delegate('li', 'mouseout', function ()
                {
                    clearTimeout(overDelayTimer);
                })
            }
            k.index = 1;
            k.lindex = 0;
            k.data.moveTimer = setInterval(k.setOpacity, options.intervalTime * 1000 + options.switchTime);
        };
        k.setOpacity = function ()
        {
            options.callback.call($('.' + k.prename + 'image_item:eq(' + (k.lindex) + ')', k.self), k.lindex, 'fadeOut');
            clearInterval(k.data.moveTimer);
            if (options.button.normal.display != 'none')
            {
                $('ul.' + k.prename + 'button li', k.self).removeClass('focus');
                $('ul.' + k.prename + 'button li', k.self).eq(k.index).addClass('focus');
            }
            $('.' + k.prename + 'image_item:animated', k.self).stop(true, false);
            $('.' + k.prename + 'image_item', k.self).css('z-index', 0);
            $('.' + k.prename + 'image_item', k.self).eq(k.index).css({
                opacity: 0,
                'z-index': 1
            });
            $('.' + k.prename + 'image_item', k.self).eq(k.index).animate({
                opacity: 1
            }, {
                duration: options.switchTime,
                easing: options.easing,
                complete: function ()
                {
                    $('.' + k.prename + 'image_box .' + k.prename + 'image_item:not(:eq(' + k.index + '))', k.self).css({
                        opacity: 0
                    });
                    options.callback.call($('.' + k.prename + 'image_item:eq(' + k.index + ')', k.self), k.index, 'fadeIn');
                    k.data.moveTimer = setInterval(k.setOpacity, options.intervalTime * 1000 + options.switchTime);
                    k.lindex = k.index;
                    if (k.index == k.size - 1)
                    {
                        k.index = 0;
                    } else
                    {
                        k.index++;
                    }
                }
            });
        };
        k.run = function ()
        {
            k.onload();
        };
        k.fn.objToCss = function (obj, excArr, excFlag)
        {
            excFlag = excFlag ? true : false;
            var isIE = navigator.userAgent.indexOf("MSIE") != -1;
            var style = '';
            if (excFlag)
            {
                for (var key in obj)
                {
                    if ($.inArray(key, excArr) != -1)
                    {
                        pKey = key.replace(/([A-Z])/, KtoLowerCase);
                        if (pKey == 'opacity' && isIE)
                        {
                            style += "filter:alpha(opacity=" + (obj[key] * 100) + ");";
                        } else
                        {
                            style += pKey + ":" + obj[key] + ";";
                        }
                    }
                };
            } else
            {
                for (var key in obj)
                {
                    if ($.isArray(excArr))
                    {
                        if ($.inArray(key, excArr) == -1)
                        {
                            pKey = key.replace(/([A-Z])/, KtoLowerCase);
                            if (pKey == 'opacity' && isIE)
                            {
                                style += "filter:alpha(opacity=" + (obj[key] * 100) + ");";
                            } else
                            {
                                style += pKey + ":" + obj[key] + ";";
                            }
                        }
                    } else
                    {
                        pKey = key.replace(/([A-Z])/, KtoLowerCase);
                        if (pKey == 'opacity' && isIE)
                        {
                            style += "filter:alpha(opacity=" + (obj[key] * 100) + ");";
                        } else
                        {
                            style += pKey + ":" + obj[key] + ";";
                        }
                    }
                };
            }

            function KtoLowerCase(word)
            {
                var str = '';
                str = '-' + word.toLowerCase();
                return str;
            };
            return style;
        };
        k.run();
    }
})(jQuery)