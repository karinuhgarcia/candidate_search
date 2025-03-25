// TODO: Create an interface for the Candidate objects returned by the API
// Expected stuff: name, username, location, avatar, email, html_url, and company
export default interface Candidate {
    readonly Name: string | null;
    readonly Username: string | null;
    readonly Location: string | null;
    readonly Avatar: string | null;
    readonly Email: string | null;
    readonly Html_url: string | null;
    readonly Company: string | null;
    readonly Bio: string | null;
}