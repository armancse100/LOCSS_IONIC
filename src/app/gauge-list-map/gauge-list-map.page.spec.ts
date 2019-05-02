import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeListMapPage } from './gauge-list-map.page';

describe('GaugeListMapPage', () => {
  let component: GaugeListMapPage;
  let fixture: ComponentFixture<GaugeListMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaugeListMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeListMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
