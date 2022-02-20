import { Injectable } from '@angular/core';
import { VoteEvenementBussinessService } from '../evenement-bussiness/vote-evenement-bussiness.service';

@Injectable({
  providedIn: 'root'
})
export class EvenementBuilderService {

  constructor(
    private VoteEvenementService:VoteEvenementBussinessService
  ) { }
}
