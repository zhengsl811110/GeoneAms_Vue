import $ from 'jquery'
export default class Server{
    constructor(url,params={}){
        this.url=url;
        this.params=params;
    }

    save(self,g){
        $.post(this.url, {params: JSON.stringify(this.params)},function(res) {
            if (res.status === 1) {
                self.$message({
                    duration:1000,
                    message: '操作成功',
                    type: 'success'
                });
                g.reload();
            }
            else{
                self.$message({
                    duration:1000,
                    message: '操作失败:'+res.message,
                    type: 'error'
                });
            }
            self.closeDialog();
        });
    }

    del(self,g,params){
        $.post(this.url,params,function(res){
            if(res.status==1){
                self.$message({
                    duration:1000,
                    message: '删除成功',
                    type: 'success'
                });
                g.reload();
            }
            else{
                self.$message({
                    duration:1000,
                    message:  '操作失败：' + res.message,
                    type: 'error'
                });
            }
        });
    }

    delbatch(self,g,len=1){
        var thisServer=this;
        self.$confirm('此操作将永久删除选中的('+len.toString()+')记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            thisServer.del(self,g,{ids:this.params}); 
        }).catch(()=>{
            self.$message({
                duration:1000,
                message: '取消删除操作',
                type: 'info'
            });
        });
    }

    delWithConfirm(self,g,params){
        self.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            $.post(this.url,params,function(res){
                if(res.status==1){
                    self.$message({
                        duration:1000,
                        message: '删除成功',
                        type: 'success'
                    });
                    g.reload();
                }
                else{
                    self.$message({
                        duration:1000,
                        message:  '操作失败：' + res.message,
                        type: 'error'
                    });
                }
            });
        }).catch(()=>{
            self.$message({
                duration:1000,
                message: '取消删除操作',
                type: 'info'
            });
        });
    }

    check(self,g,url,source){
        var thisServer=this;
        self.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            $.post(url,{ id: this.params,source: source},function(res){
                if (res.status === 1) {
                    if (res.data[0].count > 0){
                        self.$message({
                            duration:1000,
                            message: '删除失败：当前项目下存在申请记录!',
                            type: 'warning'
                        });
                    }
                    else{
                       thisServer.del(self,g,{id:thisServer.params}); 
                    }
                }
                else{
                }
            });
        }).catch(()=>{
            self.$message({
                duration:1000,
                message: '取消删除操作',
                type: 'info'
            });
        });
    }

    order(self,g,orderType="g",cRow=null){
        let ids = [], xhs = [];
        if(orderType=='g'){//分组排序
            let groups = g.groups, changedGroups=[];
            console.log(cRow);
            groups.forEach(function(group) {
                if (group[0].splxcode === cRow.splxcode) {
                    changedGroups = group;
                    return false;
                }
            });
            //判断分组是否正确 
            changedGroups.forEach(function(row, index) {
                ids.push(row.id);
                xhs.push(index + 1);
            });
        }
        else{//分页排序
            let rows = g.data.Rows,
                page = g.options.page,
                pageSize = g.options.pageSize;
            rows.forEach(function(row) {
                ids.push(row.id);
                xhs.push((page - 1) * pageSize + (row.__index + 1));
            });
        }

        $.post(this.url,{ids: ids.join(','), xhs: xhs.join(',')},function(res){
            if(res.status==1){
                self.$message({
                    duration:1000,
                    message: '调序成功',
                    type: 'success'
                });
                g.reload();
            }
            else{
                self.$message({
                    duration:1000,
                    message: '调序失败：' + res.message,
                    type: 'error'
                });
            }
        });
    }
}