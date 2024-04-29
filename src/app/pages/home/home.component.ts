import { Component } from '@angular/core';
import { BenefitsSectionComponent } from '../../components/benefits-section/benefits-section.component';
import { CollectionSectionComponent } from '../../components/collection-section/collection-section.component';
import { FeedbackSectionComponent } from '../../components/feedback-section/feedback-section.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { LogosSectionComponent } from '../../components/logos-section/logos-section.component';
import { OffersSectionComponent } from '../../components/offers-section/offers-section.component';
import { PremiumSectionComponent } from '../../components/premium-section/premium-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSectionComponent, OffersSectionComponent, BenefitsSectionComponent, PremiumSectionComponent, CollectionSectionComponent, FeedbackSectionComponent, LogosSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
