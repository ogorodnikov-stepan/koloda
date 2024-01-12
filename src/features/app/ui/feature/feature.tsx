import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';
import FeatureHeader from './feature-header';
import FeatureTitle from './feature-title';
import FeatureToolbar from './feature-toolbar';
import FeatureContent from './feature-content';
import FeatureSection from './section/feature-section';
import FeatureSectionHeader from './section/feature-section-header';
import FeatureSectionContent from './section/feature-section-content';
import FeatureSubsection from './section/feature-subsection';
import FeatureSubsectionHeader from './section/feature-subsection-header';
import FeatureSubsectionContent from './section/feature-subsection-content';
import FeatureFooter from './feature-footer';
import './feature.scss';

interface Props extends BasicProps {
  className?: string;
  entity?: string;
}

function Feature(
  { className, entity, children, ...props }: Props,
) {
  return (
    <div
      className={clsx(className, 'feature')}
      data-entity={entity}
      {...props}
    >
      {children}
    </div>
  );
}

Feature.Header = FeatureHeader;
Feature.Title = FeatureTitle;
Feature.Toolbar = FeatureToolbar;
Feature.Content = FeatureContent;
Feature.Section = FeatureSection;
Feature.SectionHeader = FeatureSectionHeader;
Feature.SectionContent = FeatureSectionContent;
Feature.Subsection = FeatureSubsection;
Feature.SubsectionHeader = FeatureSubsectionHeader;
Feature.SubsectionContent = FeatureSubsectionContent;
Feature.Footer = FeatureFooter;

export default Feature;
