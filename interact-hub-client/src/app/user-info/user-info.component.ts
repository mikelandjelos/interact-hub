import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  activeSection:string = 'contact';
  user:any;
  constructor(){}
 
  ngOnInit():void{
    const userJson = localStorage.getItem('user') ?? '';
    this.user = JSON.parse(userJson);
  }
  setActiveSection(section:string){
    this.activeSection=section;
    console.log(this.activeSection);
  }
}
