import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberInfoPage } from './member-info.page';

describe('MemberInfoPage', () => {
  let component: MemberInfoPage;
  let fixture: ComponentFixture<MemberInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
