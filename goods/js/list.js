var listHandler = {
    model: $('#listModel'),
    tbody: $('#list'),
    tfooter: $('.box-footer'),
    data: [],
    page: {
        current: 1, // 当前页
        rows: 10,   // 每页显示条数
        totals: 0,   // 总条数
        pages: 0     //  总页数
    },
    getList: function(p) {  //  获取列表
        var that = this
        if(p) that.page.current = p

     /*   $.get('/api/test', {
            p: that.page.current || 1,   //  需要获取数据的页码
            rows: that.page.rows
        }, function(data) {*/
            /** 测试数据 --start-- */
            var data = {
                page: {
                    current: that.page.current,
                    rows: 10,
                    totals: 99
                },
                data: [
                    {id: 1, title: 'test' + that.page.current},
                    {id: 2, title: 'test' + that.page.current},
                    {id: 3, title: 'test' + that.page.current},
                    {id: 4, title: 'test' + that.page.current},
                    {id: 5, title: 'test' + that.page.current},
                    {id: 6, title: 'test' + that.page.current},
                    {id: 7, title: 'test' + that.page.current},
                    {id: 8, title: 'test' + that.page.current},
                    {id: 9, title: 'test' + that.page.current},
                    {id: 10, title: 'test' + that.page.current}
                ]
            };
            /** 测试数据 --end-- */


            that.page.current = data.page.current;
            that.page.totals = data.page.totals;
            that.page.pages = Math.ceil(that.page.totals/that.page.rows)
            that.data = data.data

            that.setData()
            that.setPage()
      //  });
    },
    setData: function() {  //  设置表格数据
       this.tbody.find('tr').not('.model').not('.no-data').remove()
       this.data.length <=0 ? this.tbody.find('tr.no-data').removeClass('hidden') :  this.tbody.find('tr.no-data').addClass('hidden')
       this.page.pages > 1 ? this.tfooter.removeClass('hidden') : this.tfooter.addClass('hidden')

        var newtrs = ''
        for(var i=0,len=this.data.length; i<len; i++) {
            var m = this.model.clone().removeClass('hidden').removeClass('model').find('td'), v = this.data[i]
            m.eq(0).text(v.id)
            m.eq(1).text(v.title)
            m.eq(2).find('.edit').attr('href', './edit.html?id='+v.id)
            m.eq(2).find('.del').attr('id', v.id).click(function() {  // 删除
               console.log($(this).attr('id'))
            })

            m = m.parent('tr')
            newtrs = newtrs ? newtrs.add(m) : m
        }
        this.tbody.append(newtrs)
    },
    setPage: function() {  // 页码
        this.tfooter.find('li').not('.prev').not('.next').remove()

        var newps = ''
        for(var i=0; i<this.page.pages; i++) {
            newps += '<li onclick="listHandler.getList('+(i+1)+')"><a href="#">'+(i+1)+'</a></li>'
        }

        this.tfooter.find('li.prev').after(newps)
    },
    setPagePrevNext: function() {  //  上一页，下一页
        var that = this
        that.tfooter.find('li.prev').click(function() {
            var p = Math.max(1, that.page.current - 1)
            if(p === that.page.current) return false;

            that.getList(p)
        })
        that.tfooter.find('li.next').click(function() {
            var p = Math.min(that.page.pages, that.page.current + 1)
            if(p === that.page.current) return false;

            that.getList(p)
        })
    }
};

$(document).ready(function() {
    listHandler.getList();
    listHandler.setPagePrevNext()
});