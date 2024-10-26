import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-validator-manager',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule],
  templateUrl: './validator-manager.component.html',
  styleUrl: './validator-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidatorManagerComponent {}
