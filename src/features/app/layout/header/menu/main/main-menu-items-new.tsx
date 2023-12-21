import { useTranslation } from 'react-i18next';
import { Tabs, TabsHeader, TabHeader, TabContent } from 'features/app/ui/tabs/tabs';
import AddDeck from 'features/srs/decks/add/add-deck';
import AddRepping from 'features/srs/reppings/add/add-repping';

const PREFIX = 'app:layout.header.menu.main.new.items';

export default function MainMenuItemsNew() {
  const { t } = useTranslation('app');

  return (
    <div className="main-menu__add">
      <Tabs>
        <TabsHeader>
          <TabHeader>{t(`${PREFIX}.deck`)}</TabHeader>
          <TabHeader>{t(`${PREFIX}.repping`)}</TabHeader>
        </TabsHeader>
        <TabContent><AddDeck /></TabContent>
        <TabContent><AddRepping /></TabContent>
      </Tabs>
    </div>
  );
}
