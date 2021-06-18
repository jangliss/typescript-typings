declare namespace WazeWrap
{
    namespace Model
    {
        function getPrimaryStreetID(segmentID: number): WazeNS.Model.Object.Segment;
        function getStreetName(primaryStreetID: number): string;
        function getCityID(primaryStreetID: number): number;
        function getCityName(primaryStreetID: number): string;
        function getStateID(primaryStreetID: number): number;
        function getStateName(primaryStreetID: number): string;
        function getCountryID(primaryStreetID: number): number;
        function getCountryName(primaryStreetID: number): string;
    }

    namespace Interface
    {
        export class Tab
        {
            constructor(name: string, content: string, callback: (context: any)=>void, context: any);
        }

        function AddLayerCheckbox(group: string, checkboxText: string, checked: boolean, callback: (checked: boolean) => void);
    }
}