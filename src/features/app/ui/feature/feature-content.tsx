import { BasicProps } from 'features/app/app-types';
import ContentBlock from 'features/app/ui/block/content-block';

export default function FeatureContent({ children }: BasicProps) {
  return (
    <ContentBlock
      className="feature__content"
    >
      {children}
    </ContentBlock>
  );
}
