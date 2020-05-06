import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableColumnLinkComponent } from './data-table-column-link.component';

describe('DataTableColumnLinkComponent', () => {
  let component: DataTableColumnLinkComponent;
  let fixture: ComponentFixture<DataTableColumnLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableColumnLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableColumnLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
