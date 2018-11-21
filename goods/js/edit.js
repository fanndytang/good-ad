//  商品标签
var tagHandler = {
    el: $('#tag'),
    add: function(el) {
        var model = this.el.find('.item').first().clone()
        model.find('.del').removeClass('hidden').click(function() {
            $(this).closest('.item').remove()
        })
        model.find('input').val('')

        $(el).closest('.item').after(model)
    }
}

//  定制参数
var purHandler = {
    model: $('.purchase-model').clone().removeClass('hidden purchase-model'),
    box: $('.add-purchase-box'),
    advanceFormEl: function(el) {   // 初始化下拉款、单选复选框
        el.find('select').select2()
        el.find('input[type=checkbox]').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass   : 'iradio_minimal-blue'
        })
    },
    openClose: function(box) {    //  改变参数类型效果
        var type = box.find('.select-type').val()
        if(type) {
            box.find('.p-open-close').removeClass('hidden')
            box.find('.icheck-box').removeClass('hidden')
            box.find('.write-box').removeClass('hidden').children().addClass('hidden').siblings('[data-sel-t="'+type+'"]').removeClass('hidden')
            box.addClass('open')
        }else {
            box.find('.p-open-close').addClass('hidden')
            box.find('.icheck-box').addClass('hidden')
            box.find('.write-box').addClass('hidden').children().addClass('hidden')
            box.removeClass('open')
        }
    },
    uploadBackground: function(e, that) {   // 上传底图
        var file = e.target.files[0]

        var $previewBox = $(that).closest('.tab-content').find('.preview-con'),
            $img = $previewBox.find('img[data-t="back"]')
        if($img.length) {
            $img.attr('src', URL.createObjectURL(file))
        }else {
            $previewBox.append('<img data-t="back" style="max-width:100%;display:block;margin:0 auto;" src=' +URL.createObjectURL(file)+ ' />')
        }
    },
    uploadPurBox: function(event, that) {  // 选择图片类型时的上传图片
        var file = event.target.files[0]
        $(that).siblings('img').attr('src', URL.createObjectURL(file)).siblings('.p-up-tri').addClass('hidden')
    },
    init: function() {
        var that = this
        // tab切换
        $('.purchase-tab .item').click(function() {
            $(this).addClass('active').siblings().removeClass('active')
            $(this).closest('.purchase-box').find('.tab-content').addClass('hidden').eq($(this).index()).removeClass('hidden')
        })

        // 初始化一个定制参数模板
        this.box.append(this.model.clone())
        this.advanceFormEl(this.box)

        //  定制参数相关事件
        this.box
            .on('click', '.plus', function() {  //  添加一行
                var $box = $(this).closest('.purchase-item'), model = that.model.clone()
                model.find('.del').removeClass('hidden').end().find('select').val('').end().find('input').val('')
                that.openClose(model)
                that.advanceFormEl(model)
                $box.after(model)
            })
            .on('click', '.p-open-close .fa', function() {
                $(this).toggleClass('fa-sort-down').toggleClass('fa-sort-up')
                $(this).closest('.p-open-close').siblings('.write-box').toggleClass('hidden')
                $(this).closest('.purchase-item').toggleClass('open')
            })
            .on('change', '.select-type', function() {
                that.openClose($(this).closest('.purchase-item'))
            })
            .on('ifChanged', '.plus-box input[type=checkbox]', function() {
                var box = $(this).closest('.purchase-item'),
                    preBox = box.closest('.tab-content').find('.preview-con'),
                    type = parseInt(box.find('.select-type').val()),
                    typeBox = box.find('.write-box [data-sel-t="'+type+'"]'),
                    style = 'position:absolute;top:50%;left:40%;',
                    text = typeBox.find('input.text').val(),
                    fontSize = typeBox.find('input.size').val() || '14px',
                    radio = typeBox.find('input.radio').val() || 0,
                    rotate = typeBox.find('input.rotate').val() || 0

                switch (type) {
                    case 1:
                        style += 'font-size:'+fontSize+
                            ';-webkit-transform:rotate('+rotate+'deg)'+
                            ';-moz-transform:rotate('+rotate+'deg)'+
                            ';-ms-transform:rotate('+rotate+'deg)'+
                            ';-o-transform:rotate('+rotate+'deg)'+
                            ';transform:rotate('+rotate+'deg);';
                        preBox.append('<span style="'+style+'">'+text+'</span>')
                        break;
                }
            })
    }
}

//  其它
var formHandler = {
    uploadGoodImg: function(event, el) { //  上传商品图片
        var file = event.target.files[0], url = URL.createObjectURL(file), $upBox = $(el).closest('.upload-box')

        $(el).val('').closest('.up-trigger').before('<div class="up-item"><img src="'+url+'" /><span class="fa fa-trash-o del"></span></div>')

        if($upBox.find('.up-item').length >= 5) {  //  商品图片最多5张
            $(el).attr('disabled', 'disabled')
        }

        $upBox.find('.up-item').last().find('.del').click(function() {  //  删除商品图片
            $(this).closest('.up-item').remove()
            if($upBox.find('.up-item').length < 5) {  //  商品图片最多5张
                $upBox.find('input[type=file]').removeAttr('disabled')
            }
        })
    },
  init: function() {
      CKEDITOR.replace('editor3')

      $('.select2').select2()
      $('input[type="radio"].minimal').iCheck({
          checkboxClass: 'icheckbox_minimal-blue',
          radioClass   : 'iradio_minimal-blue'
      })
  }
}

$(document).ready(function() {
    formHandler.init()
    purHandler.init()

})