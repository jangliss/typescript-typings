interface Array<T>
{
    find(callback: (element: T, index: number, array: Array<T>) => boolean);
}

declare namespace WazeNS
{
    export interface DataModel
    {
        cities: Model.ObjectRepository<WazeNS.Modules.Cities.Model.City, number>;
        events: any;
        actionManager: any;
        junctions: Model.NumberRepository<WazeNS.Model.Object.Junction>;
        mapComments: Model.StringRepository<Model.Object.MapComment>;
        repositoryFilters: any;
        segments: Model.RepositoryOfSegments;
        streets: Model.NumberRepository<WazeNS.Model.Object.Street>;
        states: Model.NumberRepository<WazeNS.Model.Object.State>;
        venues: Model.VenueRepository;
        isLeftHand: boolean;
        lastTransactionID: string;
        managedAreas: Model.StringRepository<Model.Object.EditableArea>;
        addRepository(e: any, t: any, i: any, n: any): void;
        getTurnGraph(): Model.Graph.TurnGraph;
        users: Model.NumberRepository<WazeNS.Model.Object.User>;
    }

    export interface Controller
    {
        reload(): void;
        updateModel(e: any): void;
    }

    export interface ActionManager
    {
        canUndo(): boolean;
        undo(): void;
        add(e: any): void;
    }

    export interface LoginManager
    {
        events: any;
        expired: boolean;
        returningUser: boolean;
        user: Model.Object.LoggedInUser;
        getLoggedInUser(): any;
        hasUser: boolean;
        isLoggedIn: boolean;
        getUserRank(): number;
        isAdOperation: boolean;
        canEditPlaceUpdates: boolean;
        canEditAdLockedPlaceUpdated: boolean;
        canEditBigJunctions: boolean;
        login(e, t): void;
        getCsrfToken(): any;
        doLogin(e, t): any;
        logout(): void;
        CLASS_NAME: string;
    }

    export interface Map extends OpenLayers.Map
    {
        addUniqueLayer(layer: OpenLayers.Layer): void;
        getLayerByUniqueName(layer: string): OpenLayers.Layer.Vector;
        setLayerVisibility(layer: string, state: boolean): void;
        zoomTo(zoomLevel: number): void;
        roadLayers: Array<OpenLayers.Layer.XYZ>;
    }

    export interface SelectedItem extends WazeNS.Feature.Vector {
        model: Feature.Vector;
    }

    export interface SelectionManager {
        selectedItems: Array<SelectedItem>;
        events: OpenLayers.Events;
    }

    namespace Model
    {
        namespace Object
        {
            export interface Address {
                attributes: {
                    city: WazeNS.Model.Object.City;
                    country: WazeNS.Model.Object.Country;
                    houseNumber: string;
                    state: WazeNS.Model.Object.State;
                    street: WazeNS.Model.Object.Street;
                    isEmpty: boolean;
                }
            }

            export interface City extends WazeNS.Model.Object<number>
            {
                attributes: {
                    countryID: number;
                    englishName: string;
                    isEmpy: boolean;
                    name: string;
                    permissions: number;
                    rank: number;
                    stateID: number;
                };
                hasName(): boolean;
            }

            export interface ModelCollection<T> {
                length: number;
                models: Array<T>;
            }

            export interface Comment {
                attributes: {
                    createdOn: number;
                    text: string;
                    userID: number;
                }
            }

            export interface Country extends WazeNS.Model.Object<number>
            {
                abbr: string;
                allowCamerasRank: number;
                allowNewCitiesRank: number;
                allowRoadClosureRank: number;
                allowSpeedCams: boolean;
                env: string;
                forceHouseNumberRank: number;
                leftHandTraffic: boolean;
            }

            export interface EditableArea extends WazeNS.Model.Object<string>
            {
                geometry: OpenLayers.Geometry;
                area: string;
                getUserName(): string;
            }

            export interface Junction extends WazeNS.Model.Object<number>
            {
                segIDs: Array<number>;
                getAllSegments(): Array<WazeNS.Model.Object<number>>
            }

            export interface MapComment extends Feature.Vector
            {
                attributes: {
                    body: string;
                    createdBy: number;
                    createdOn: number;
                    endDate: string;
                    id: string;
                    lockRank: number;
                    subject: string;
                    updatedBy: number;
                    updatedOn: number;
                    geometry: OpenLayers.Geometry;
                };
                isPoint(): boolean;
                getPointGeometry(): OpenLayers.Geometry;
                getPolygonGeometry(): OpenLayers.Geometry;
                getComments(): ModelCollection<Comment>;
            }

            export interface NavigationPoint {
                entry: boolean;
                exit: boolean;
                point: OpenLayers.Geometry.Point
            }

            export interface State extends WazeNS.Model.Object<number>
            {
                countryID: string;
                isDefault: boolean;
            }

            export interface Venue extends Feature.Vector.Landmark
            {
                attributes: {
                    adLocked: boolean;
                    createdBy: number;
                    id: string;
                    approved: boolean;
                    brand: string;
                    categories: Array<string>;
                    description: string;
                    externalProviderIDs: Array<any>;
                    houseNumber: string;
                    lockRank: number;
                    name: string;
                    residential: boolean;
                    updatedBy: number;
                    url: string;
                };
                geometry: OpenLayers.Geometry.Collection;
            }

            export interface Segment extends Feature.Vector.Segment
            {
                attributes: {
                    id: number;
                    createdBy: number;
                    primaryStreetID: number;
                    length: number;
                    level: number;
                    lockRank: number;
                    geometry: OpenLayers.Geometry;
                    roadType: number;
                    routingRoadType: number;
                    fwdDirection: boolean;
                    revDirection: boolean;
                    revMaxSpeed: number;
                    revMaxSpeedUnverified: boolean;
                    fwdMaxSpeed: number;
                    fwdMaxSpeedUnverified: boolean;
                    streetIDs: Array<number>;
                    updatedBy: number;
                };
                geometry: OpenLayers.Geometry.Collection;
            }

            export interface Street extends Model.Object<number>
            {
                cityID: number;
                isEmpty(): boolean;
                signText: string;
            }

            export interface LoggedInUser
            {
                LevelToMies: number;
                isCountryManager: boolean;
                CLASS_NAME: string;
                normalizedLevel: number;
                editableMiles: number;
                adOperator: boolean;
                chatBanned: boolean;
                debugUser: boolean;
                globalEditor: boolean;
                id: number;
                isAreaManager: boolean;
                isFiltered: boolean;
                isStaff: boolean;
                mapEditingBanned: boolean;
                mteManager: boolean;
                rank: number;
                totalEdits: number;
                totalPoints: number;
                userName: string;
                areas: Array<EditableArea>;
            }

            export interface User extends Feature.Vector.User
            {
                id: number;
                normalizedLevel: number;
                rank: number;
                type: string;
                userName: string;
            }
        }

        namespace Graph
        {
            export interface TurnGraph
            {
                getTurnThroughNode(n: Feature.Vector.Node, fromSeg: Feature.Vector.Segment, toSeg: Feature.Vector.Segment) : {
                    getTurnData(): {
                        getRestrictions() : Array<any>;
                        isAllowed(): boolean;
                        isDisallowed(): boolean;
                        isUnknown(): boolean;
                    }
                }
            }
        }

        interface NumberRepository<T> extends WazeNS.Model.ObjectRepository<T, number>
        {
            model: WazeNS.DataModel;
            name: string;
            objectType: string;
            active: boolean;
            objects: {
                [id: number]: T
            };
        }

        interface StringRepository<T> extends WazeNS.Model.ObjectRepository<T, string>
        {
            model: WazeNS.DataModel;
            name: string;
            objectType: string;
            active: boolean;
            objects: {
                [id: string]: T
            };
        }

        interface RepositoryOfSegments extends SegmentRepository
        {
            active: boolean;
            name: string;
            objectType: string;
            objects: {
                [id: number]: Model.Object.Segment
            }
        }

        export interface ObjectRepository<T, TId>
        {
            get(id: TId): T;
            getByAttributes(e: any): T;
        }

        export interface SegmentRepository extends ObjectRepository<Model.Object.Segment, number>
        {
            zoomToRoadType: Array<any>;
            topCityID: number;

            CLASS_NAME: string;
        }

        export interface LandmarkRepository extends StringRepository<Model.Object.Venue>
        {
            clear(): void;
        }

        export interface VenueRepository extends LandmarkRepository
        {
            filter: {
                _categoryOrder: Array<any>;
                _attributes: Array<any>;
                setAttribute(filter: string, attribute: string, value: any);
            }
        }

        export interface Object<T>
        {
            id: T;
            state: string;
            name: string;
            type: string;
            persistent: boolean;
            getID(): T;
            setID(id: T): void;
            isNew(): boolean;
            isDeleted(): boolean;
            isUpdated(): boolean;
            isUnchanged(): boolean;
            getVersion() : number;
            clone() : Object<T>;
            setSelected(e: boolean): void;
            isSelected(): boolean;
            setSnapped(e: boolean): void;
            isSnapped(): boolean;
            setPersistent(e: boolean);
            isPersistent(): boolean;
            getPermissions(): number;
            isAllowed: boolean;
            isInUse(e: any): boolean;
            isDeletable: boolean;
            arePropertiesEditable: boolean;
            isGeometryEditable: boolean;
            merge(e: any): void;
            getOriginalValue(e: any): any;
            getAttributes(): Object<T>;
            CLASS_NAME: string;
        }

    }

    namespace Feature
    {
        namespace Vector
        {
            export interface LoggedInUser
            {
                areas: Array<WazeNS.Model.Object.EditableArea>;
            }

            export interface Landmark extends Vector
            {
                constructor({
                    geometry,
                    categories
                });
                is2D(): boolean;
                isPoint(): boolean;
                arePropertiesEditable(): boolean;
                areUpdateRequestsEditable(): boolean;
                getAddress(): WazeNS.Model.Object.Address;
                getCategorySet(): {
                    [propName: string]: boolean;
                };
                getLockRank(): number;
                getMainCategory(): string;
                getNavigationPoint(): WazeNS.Model.Object.NavigationPoint;
                getPointGeometry(): OpenLayers.Geometry.Point;
                getPolygonGeometry(): OpenLayers.Geometry.Polygon;
                hasOpenUpdateRequests(): boolean;
                isApproved(): boolean;
                isGasStation(): boolean;
                isParkingLot(): boolean;
                isPoint(): boolean;
                isResidential(): boolean;
            }

            export interface Node extends Vector
            {
                allConnectionKeys() : {
                    all: Array<{
                        from: Model.Object.Segment;
                        to: Model.Object.Segment;
                    }>;
                    legal: Array<{
                        from: Model.Object.Segment;
                        to: Model.Object.Segment;
                    }>;
                };
                areAllConnectionsDisabled(): boolean;
                areAllConnectionsEnabled(): boolean;
                attributes: {
                    id: number;
                    segIDs: Array<number>;
                };
                connectionsExist(): boolean;
                isDeleteable(model: WazeNS.DataModel): boolean;
            }

            export interface Segment
            {
                arePropertiesEditable(): boolean;
                areTurnsLocked(node: WazeNS.Feature.Vector.Node):boolean;
                getAddress(): {
                    street: WazeNS.Model.Object.Street;
                    city: WazeNS.Modules.Cities.Model.City;
                    state: WazeNS.Model.Object.State;
                    country: WazeNS.Model.Object.Country;
                    altStreets: Array<WazeNS.Model.Object.Street>;
                };
                getRoundabout(): WazeNS.Model.Object.Junction;
                isDrivable(): boolean;
                isInBigJunction(): boolean;
                isInRoundabout(): boolean;
                isLockedByHigherRank(): boolean;
                isTurnAllowed(toSegment: Model.Object.Segment, Node): boolean;
                getRestrictionCount(): number;
                getConnectedSegments(direction: string): Array<Model.Object.Segment>;
                getConnectedSegmentsByDirection(direction: string) : Array<Model.Object.Segment>;
                getNodeByDirection(direction: string): Feature.Vector.Node;
            }

            export interface User
            {
                MaxLeve: number;
                MinLevel: number;
                StaffRank: number;
                isStaffUser(): boolean;
            }
        }

        export interface Vector extends OpenLayers.Feature.Vector
        {
            arePropertiesEditable(): boolean;
            type: string;
            CLASS_NAME: string;
            isGeometryEditable(): boolean;
        }
    }

    namespace Modules {
        namespace Cities {
            namespace Model {
                export interface Repository extends WazeNS.Model.ObjectRepository<WazeNS.Modules.Cities.Model.City, number> {
                    getValidCities(): Array<WazeNS.Modules.Cities.Model.City>;
                }

                export interface City extends WazeNS.Feature.Vector {
                    attributes: {
                        countryID: number;
                        englishName: string;
                        geometry: OpenLayers.Geometry;
                        id: number;
                        isEmpty: boolean;
                        name: string;
                        rank: number;
                        stateID: number;
                    }
                    geometry: OpenLayers.Geometry;
                    hasName(): boolean;
                    isEmpty(): boolean;
                    showMarker(): boolean;
                }
            }
        }
    }
}

interface WazeStatic {
    loginManager: WazeNS.LoginManager;
    map: WazeNS.Map;
    model: WazeNS.DataModel;
    vent: Backbone.Wreqr.EventAggregator;
    controller: WazeNS.Controller;
    location: {
        code: string;
    };
    selectionManager: WazeNS.SelectionManager;
    Config: {
        venues: {
            categories: Array<string>;
            subcategories: {
                [propName: string]: Array<string>;
            }
        }
    };
}

declare var W: WazeStatic;
//declare var Waze: WazeStatic;