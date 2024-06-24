import {
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";
import useComposedRefs from "@allygory/use-compose-refs";
import { createContextScope } from "@allygory/context";
import Slot from "@allygory/slot";

type SlotProps = ComponentPropsWithoutRef<typeof Slot>;
type CollectionElement = HTMLElement;
type CollectionProps = SlotProps & {
  scope: any;
};

function createCollection<ItemElement extends HTMLElement, ItemData = {}>(
  name: string,
) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope] =
    createContextScope(PROVIDER_NAME);

  type ContextValue = {
    collectionRef: RefObject<CollectionElement>;
    itemMap: Map<
      RefObject<ItemElement>,
      { ref: RefObject<ItemElement> } & ItemData
    >;
  };

  const [CollectionProviderImpl, useCollectionContext] =
    createCollectionContext<ContextValue>(PROVIDER_NAME, {
      collectionRef: { current: null },
      itemMap: new Map(),
    });

  /* -----------------------------------------------------
   * CollectionProvider
   * ----------------------------------------------------*/
  const CollectionProvider: FC<{ children?: ReactNode; scope: any }> = (
    props,
  ) => {
    const { scope, children } = props;
    const ref = useRef<CollectionElement>(null);
    const itemMap = useRef<ContextValue["itemMap"]>(new Map()).current;

    return (
      <CollectionProviderImpl
        collectionRef={ref}
        scope={scope}
        itemMap={itemMap}
      >
        {children}
      </CollectionProviderImpl>
    );
  };

  CollectionProvider.displayName = PROVIDER_NAME;

  /* ----------------------------------------------------
   * CollectionSlot
   * ----------------------------------------------------*/
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";

  const CollectionSlot = forwardRef<CollectionElement, CollectionProps>(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composeRefs = useComposedRefs(forwardedRef, context.collectionRef);

      return <Slot ref={composeRefs}>{children}</Slot>;
    },
  );

  CollectionSlot.displayName = COLLECTION_SLOT_NAME;

  /* -----------------------------------------------------
   * CollectionItem
   * ----------------------------------------------------*/
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-allygory-collection-item";

  type CollectionItemSlotProps = ItemData & {
    children: ReactNode;
    scope: any;
  };

  const CollectionItemSlot = forwardRef<ItemElement, CollectionItemSlotProps>(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = useRef<ItemElement>(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const context = useCollectionContext(ITEM_SLOT_NAME, scope);

      useEffect(() => {
        context.itemMap.set(ref, { ref, ...(itemData as unknown as ItemData) });
        return () => void context.itemMap.delete(ref);
      });

      return (
        <Slot ref={composedRefs} {...{ [ITEM_DATA_ATTR]: "" }}>
          {children}
        </Slot>
      );
    },
  );

  CollectionItemSlot.displayName = ITEM_SLOT_NAME;

  /* -----------------------------------------------------
   * useCollection
   * ----------------------------------------------------*/
  const useCollection = (scope: any) => {
    const context = useCollectionContext(name + "CollectionConsumer", scope);

    const getItems = useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(
        collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`),
      );
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) =>
          orderedNodes.indexOf(a.ref.current!) -
          orderedNodes.indexOf(b.ref.current!),
      );

      return orderedItems;
    }, [context.collectionRef, context.itemMap]);

    return getItems;
  };

  return [
    {
      Provider: CollectionProvider,
      Slot: CollectionSlot,
      ItemSlot: CollectionItemSlot,
    },
    useCollection,
    createCollectionScope,
  ] as const;
}

export type { CollectionProps };
export default createCollection;
