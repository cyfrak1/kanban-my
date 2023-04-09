import { Component, Input, OnInit } from '@angular/core';
import { ContextMenuService } from 'src/app/core/services/context-menu/context-menu.service';
import { ContextMenuData } from 'src/app/core/interfaces/contextMenuInterface';
import { ClickedOnElement } from 'src/app/core/types/contextMenu';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  @Input() list : ContextMenuData[] = [];
  contextMenuState : boolean = false;
  constructor(private contextMenuService : ContextMenuService, private scroll : ViewportScroller) { }

  ngOnInit(): void {
    this.contextMenuService.isContextMenuActiveListener().subscribe((res : boolean)=>{
      this.contextMenuState = res;
    });
    this.contextMenuService.ContextMenuDataListener().subscribe(( res : ContextMenuData[] )=>{
      this.list = res;
    })
  } 
  changeContextMenuState() : void {
    this.contextMenuService.updateContextMenuState(false,0);
    this.scroll.scrollToPosition([window.innerWidth,0])
  }
  onClick(functionToLoad : any) : void {
    functionToLoad();
    this.contextMenuState = false;
  }
}
