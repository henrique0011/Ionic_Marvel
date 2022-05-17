import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { ServiceService } from '../api/service.service';
import { PaginationComponent } from './../util/pagination/pagination.component';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private service: ServiceService) { }

  public getCharecterById(id: number){
    return new Promise((ret)=>{
      this.service.getDados('/v1/public/characters/' + id,'')
      .then((data: any)=>{
        if(data && data.data && data.data.results){
          ret(data.data.results);

        }else{
          ret([]);
        }
      })
    })
  }

  public getAllCharters(
    pagination: PaginationComponent,
    filter : string){
    let strFilter ='';

    let param = '&limit=' + pagination.getLimit() + '&offset' + pagination.getOffset() + strFilter;

    return new Promise((ret)=> {
      this.service.getDados('/v1/public/characters', param).then((data: any)=>{
        if (data && data.data && data.data.results){
          this.updatePagination(pagination, data.data);
          ret (data.data.results);
        }else{
          ret([]);
        }
      })
    })
  }
    
  public getComicsByCharater(id: number){
    return new Promise((ret)=>{
      this.service.getDados('/v1/public/characters/' + id + '/comics', '').then((data:any)=>{
        if (data && data.data && data.data.results){
          ret (data.data.results);
        }else{
          ret([]);
        }
      })
    })
  }

  

  /* atualiza as informações de paginação */
  private updatePagination(pagination: PaginationComponent, data: any){
    pagination.setTotal(data.total);
    pagination.setLimit(data.limit);
    pagination.createPages();
  }
}


