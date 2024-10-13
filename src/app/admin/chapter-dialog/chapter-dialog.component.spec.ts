import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterDialogComponent } from './chapter-dialog.component';

describe('ChapterDialogComponent', () => {
  let component: ChapterDialogComponent;
  let fixture: ComponentFixture<ChapterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
