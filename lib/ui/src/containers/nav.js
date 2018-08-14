import React from 'react';
import { inject } from 'mobx-react';

import { Nav, Explorer } from '@storybook/components';

import * as filters from '../libs/filters';
import {
  prepareStoriesForHierarchy,
  resolveStoryHierarchy,
  resolveStoryHierarchyRoots,
  createHierarchies,
} from '../libs/hierarchy';

import { toNested } from '../libs/nav/nav';

export const mapper = store => {
  const {
    stories: data,
    selectedKind,
    selectedStory,
    uiOptions: {
      name,
      url,

      sortStoriesByKind,
      hierarchySeparator,
      hierarchyRootSeparator,
      sidebarAnimations,
    },
    storyFilter,
  } = store;

  const stories = toNested(data, {
    rootSeperator: hierarchyRootSeparator,
    groupSeperator: hierarchySeparator,
  });

  //
  // const preparedStories = prepareStoriesForHierarchy(
  //   stories,
  //   hierarchySeparator,
  //   hierarchyRootSeparator
  // );
  //
  // const filteredStories = filters.storyFilter(
  //   preparedStories,
  //   storyFilter,
  //   selectedKind,
  //   selectedStory,
  //   sortStoriesByKind
  // );
  //
  // const storiesHierarchies = createHierarchies(filteredStories);
  //
  // const { storyName } = resolveStoryHierarchyRoots(selectedKind, hierarchyRootSeparator);
  // const selectedHierarchy = resolveStoryHierarchy(storyName, hierarchySeparator);

  return {
    title: name,
    url,
    sections: [
      {
        id: 'components',
        name: 'components',
        render: () => (
          <Explorer
            stories={stories}
            storyFilter={storyFilter}
            onStoryFilter={filter => store.setStoryFilter(filter)}
            selectedKind={selectedKind}
            selectedStory={selectedStory}
          />
        ),
        active: true,
      },
      {
        id: 'settings',
        name: 'settings',
        render: () => <div>Settings NAV</div>,
        active: false,
      },
    ],
    notification: [],

    selectedKind,
    selectedStory,
    onSelectStory: (kind, story) => store.selectStory(kind, story),
    storyFilter,
    onStoryFilter: filter => store.setStoryFilter(filter),
  };
};

export default inject(({ store }) => mapper(store))(Nav);