export function zip2<A, B, C>(a: A[], b: B[]): [A, B][] {
	return a.map((a, index) => [a, b[index]]);
}

export function zip3<A, B, C>(a: A[], b: B[], c: C[]): [A, B, C][] {
	return a.map((a, index) => [a, b[index], c[index]]);
}
