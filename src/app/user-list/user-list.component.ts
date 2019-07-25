import { Component, OnInit } from '@angular/core';
import { UserListService } from './user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: object;
  public otherUsers:any;
  public usersLoaded:boolean = false;

  constructor(private userListService: UserListService) { }

  ngOnInit() {
    this.userListService.getMockUsers().subscribe(response => {
      if(response) {
        this.users = response.data;
        this.enableExpandNav()        
      }
    })
  } 

  enableExpandNav(){
    let onlineUsersIcon = document.querySelector('.online-users__header-icon');
    console.log(onlineUsersIcon);
    onlineUsersIcon.classList.remove('online-users__header-icon--disabled');
    onlineUsersIcon.classList.add('online-users__header-icon--enabled');
    this.usersLoaded = true;
  }

  expandUsers(){
    let onlineUsers = document.querySelector('.online-users');
    onlineUsers.classList.toggle("online-users--expanded");
  }

}
