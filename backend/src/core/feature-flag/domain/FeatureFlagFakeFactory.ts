import { faker } from '@faker-js/faker';

import { FeatureFlagProps } from './FeatureFlag.entity';
import { Uuid } from '../..//shared/domain/uuid';

export class FeatureFlagFakeFactory {
  static Fake(props?: FeatureFlagProps) {
    return {
      id: props?.id ?? Uuid.generate_uuidv4(),
      name: props?.name || faker.string.sample(7),
      description: props?.description ?? faker.string.sample(7),
      is_active:
        props?.is_active ?? faker.datatype.boolean({ probability: 0.5 }),
      created_at: props?.created_at || faker.date.anytime(),
      updated_at: props?.updated_at || faker.date.anytime(),
    };
  }
}
