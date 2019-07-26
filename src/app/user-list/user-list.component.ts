import { Component, OnInit } from '@angular/core';
import { UserListService } from './user-list.service';
import { Constants } from '../../common/Constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: object;
  public otherUsers:any;
  public usersLoaded:boolean = false;
  public title:string;
  private usersExpanded:boolean = false;
  public iconModifier:string = 'online-users__header-icon--disabled';

  constructor(private userListService: UserListService) { }

  ngOnInit() {
    this.title = Constants.EXPAND_TITLE;
    this.userListService.getMockUsers().subscribe(response => {
      if(response) {
        //spoof a network delay of 3 seconds to see the nav is disabled
        setTimeout(() => {
          this.users = response.data;
          this.enableExpandNav() 
        }, 3000);
               
      }
    })
  } 

  enableExpandNav(){
    //change class by using angular
    this.iconModifier = 'online-users__header-icon--enabled';    
    this.usersLoaded = true;    
  }

  expandUsers(){
    this.usersExpanded = !this.usersExpanded;
    //change class by javascript querying
    let onlineUsers = document.querySelector('.online-users');
    onlineUsers.classList.toggle("online-users--expanded");   
    this.usersExpanded ? this.title = Constants.MIN_TITLE : this.title = Constants.EXPAND_TITLE;
  }

}
