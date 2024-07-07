import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'creditCardAdminPortal';
  public sidebarOpened=true;
  public toggleSidebar(){
    this.sidebarOpened=!this.sidebarOpened;
  }
}
