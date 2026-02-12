export interface ReviewItem {
  id: string;
  quoteKey: string;
  bodyKey: string;
  authorKey: string;
}

export const REVIEWS: ReviewItem[] = [
  { id: '1', quoteKey: 'review1Quote', bodyKey: 'review1Body', authorKey: 'review1Author' },
  { id: '2', quoteKey: 'review2Quote', bodyKey: 'review2Body', authorKey: 'review2Author' },
  { id: '3', quoteKey: 'review3Quote', bodyKey: 'review3Body', authorKey: 'review3Author' },
  { id: '4', quoteKey: 'review4Quote', bodyKey: 'review4Body', authorKey: 'review4Author' },
];
