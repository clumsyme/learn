// I've been reading Professional JavaScript for Web Developers/3rd edition in Chinese.
// On introducing the "range" in DOM from chapter 12, page 339,the book writes:
range1.compareBoundaryPoints(Range.P1_TO_P2, range2)
// will compare P1 of range1 to P2 of range2,
// if (P1 of range1)<(P2 of range2), the function will return -1.
// However, that's not what will happen.
// In fact, it will compare P1 of range2 to P2 of range1, 
// and if (P2 of range1)<(P1 of range2), the function will return -1.

// So the following code:
range1.compareBoundaryboundaryPoints(Range.START_TO_END, range2)
// will compare the end boundary-point of range1 to the start boundary-point of range2,
// and return 1 if range1.end > range2.start.

// Seems a translation mistake.

// ps：Acturally, it seems more natural, for me, that it behaves the previous wrong way that 
// START_TO_END compare start of range1 to end of range2.

// reference :　https://developer.mozilla.org/en-US/docs/Web/API/Range/compareBoundaryPoints
