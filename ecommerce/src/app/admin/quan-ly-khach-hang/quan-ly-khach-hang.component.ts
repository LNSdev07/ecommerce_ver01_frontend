import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from "./_services/user.service";



@Component({
  selector: 'app-quan-ly-khach-hang',
  templateUrl: './quan-ly-khach-hang.component.html',
  styleUrls: ['./quan-ly-khach-hang.component.scss']
})
export class QuanLyKhachHangComponent implements OnInit {
  data: any;
  constructor(private userService: UserService){

  }

  ngOnInit(): void {
    this.userService.getListUser().subscribe(x =>{
      this.data = x.data;
      console.log(this.data)
    })

  }

  searchTerm = '';

  search() {
    this.userService.findUser(this.searchTerm).subscribe(x =>{
      this.data = x.data;
      console.log(this.data)
    })
  }

  changeStatus(username: string) {
         console.log(username);
         this.userService.findUserByUserName(username).subscribe(data =>{
           if(data){
             data.status = (data.status === 1)? 0: 1;
             this.userService.changeStatus(data).subscribe(x =>{
               this.data = x.data;
               console.log('da sua trang thai')
             });
           }
           else{
             alert("Khách hàng không tồn tại")
           }
         })
  }
}

