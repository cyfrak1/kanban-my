import { Component, Input, OnInit } from '@angular/core';
import { ContextMenuService } from 'src/app/core/services/context-menu/context-menu.service';
import { ContextMenuData } from 'src/app/core/interfaces/contextMenuInterface';
import { ClickedOnElement } from 'src/app/core/types/contextMenu';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  @Input() list : ContextMenuData[] = [];
  contextMenuState : boolean = false;
  constructor(private contextMenuService : ContextMenuService) { }

  ngOnInit(): void {
    this.contextMenuService.isContextMenuActiveListener().subscribe((res : boolean)=>{
      this.contextMenuState = res;
    });
    this.contextMenuService.ClickedOnElementListener().subscribe((res : ClickedOnElement)=>{
      this.changeMenuAccordingToClickedOnElement(res)
    })
  } 
  changeMenuAccordingToClickedOnElement( element : ClickedOnElement ) : void {
    if(element == "bucket"){
      this.list = this.list.filter((listElement)=>{ return listElement.menuElementName != "Edytuj"})
    }
  }
}
