import { Component } from '@angular/core';
import { Highway } from '../model/highway.model';
import { HighwayService } from '../service/highway.service';
// import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-highways',
  templateUrl: './highways.component.html',
  styleUrls: ['./highways.component.css'],
})
export class HighwaysComponent {
  highways: Highway[] = [];
  highwaysAmount: number = 0;
  newHighway: Highway = new Highway('', NaN, '', true, '');
  selectedHighway: Highway = new Highway('', NaN, '', true, '');
  createModalOn = false;
  updateModalOn = false;
  deleteModalOn = false;

  body = {
    maxPageSize: 15,
    pageIndex: 1,
    pageSize: 100,
    keyword: '',
    sorting: '',
  };

  pageIndexCount = 0;
  pageIndexArray: number[] = [];
  newMaxPageSize: number = 15;
  newBodyKeyword = '';
  constructor(private highwayService: HighwayService) {}

  ngOnInit() {
    // initFlowbite();
    this.onGetAllHighways();
  }

  //search highway
  onSearchHighways() {
    this.body.keyword = this.newBodyKeyword.trim();
    this.onGetAllHighways();
  }

  //reset keyword
  onResetKeyword() {
    this.newBodyKeyword = '';
    this.body.keyword = '';
    this.onGetAllHighways();
  }

  //change hiển thị dòng/trang
  onChangePageSize() {
    this.body.maxPageSize = this.newMaxPageSize;
    this.body.pageIndex = 1;
    this.onGetAllHighways();
  }

  //change page
  onChangePage(pageNumber: number) {
    this.body.pageIndex = pageNumber;
    this.onGetAllHighways();
  }

  //previous page
  onPreviousPage() {
    if (this.body.pageIndex > 1) {
      this.body.pageIndex = this.body.pageIndex - 1;
    }
    this.onGetAllHighways();
  }

  //next page
  onNextPage() {
    if (this.body.pageIndex < this.pageIndexCount) {
      this.body.pageIndex = this.body.pageIndex + 1;
    }
    this.onGetAllHighways();
  }

  //sorting
  onSort(sortString: string) {
    switch (sortString) {
      case 'name':
        if (this.body.sorting === '') {
          this.body.sorting = 'name asc';
        } else if (this.body.sorting.includes('asc')) {
          this.body.sorting = 'name desc';
        } else if (this.body.sorting.includes('desc')) {
          this.body.sorting = '';
        }
        this.onGetAllHighways();
        break;
      case 'speed':
        if (this.body.sorting === '') {
          this.body.sorting = 'maxSpeed asc';
        } else if (this.body.sorting.includes('asc')) {
          this.body.sorting = 'maxSpeed desc';
        } else if (this.body.sorting.includes('desc')) {
          this.body.sorting = '';
        }
        this.onGetAllHighways();
        break;
      case 'description':
        if (this.body.sorting === '') {
          this.body.sorting = 'description asc';
        } else if (this.body.sorting.includes('asc')) {
          this.body.sorting = 'description desc';
        } else if (this.body.sorting.includes('desc')) {
          this.body.sorting = '';
        }
        this.onGetAllHighways();
        break;
      case 'status':
        if (this.body.sorting === '') {
          this.body.sorting = 'inactive asc';
        } else if (this.body.sorting.includes('asc')) {
          this.body.sorting = 'inactive desc';
        } else if (this.body.sorting.includes('desc')) {
          this.body.sorting = '';
        }
        this.onGetAllHighways();
        break;
    }
  }

  //get all highways
  onGetAllHighways() {
    this.highwayService.getAllHighways(this.body).subscribe((res: any) => {
      this.highways = res.data.items;
      this.highwaysAmount = res.data.totalCount;
      this.pageIndexCount = Math.floor(
        this.highwaysAmount / this.body.maxPageSize + 1
      );
      this.pageIndexArray = Array.from(
        { length: this.pageIndexCount },
        (_, i) => i + 1
      );
    });
  }

  //get a highway by Id
  onGetAHighway(id: string) {
    this.highwayService.getHighwayByID(id).subscribe((res: any) => {
      this.selectedHighway = res.data;
    });
  }

  //create a new highway
  onCreateAHighway() {
    console.log('Enter this');
    this.highwayService
      .createANewHighway(this.newHighway)
      .subscribe((res: any) => {
        this.onGetAllHighways();
      });
    this.newHighway = new Highway('', NaN, '', true, '');
    this.onToggleCreateModal();
  }

  //update a highway
  onUpdateAHighway() {
    this.highwayService
      .updateAHighway(this.selectedHighway)
      .subscribe((res: any) => {
        this.onGetAllHighways();
      });
    this.onToggleUpdateModal();
  }

  //delete a highway by Id
  onDeleteAHighway() {
    let id = this.selectedHighway.id;
    this.highwayService.deleteAHighway(id).subscribe((res: any) => {
      this.highways = this.highways.filter((highway) => highway.id !== id);
      this.onGetAllHighways();
    });
    this.onToggleDeleteModal();
  }

  onToggleCreateModal() {
    this.createModalOn = !this.createModalOn;
  }

  onOpenCreateModal() {
    this.onToggleCreateModal();
  }

  onToggleUpdateModal() {
    this.updateModalOn = !this.updateModalOn;
  }

  onOpenUpdateModal(id: string) {
    this.onToggleUpdateModal();
    this.onGetAHighway(id);
  }

  onToggleDeleteModal() {
    this.deleteModalOn = !this.deleteModalOn;
  }

  onOpenDeleteModal(id: string) {
    this.onToggleDeleteModal();
    this.onGetAHighway(id);
  }
}
