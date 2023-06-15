import { SiteProfile } from "./site-profile.entity";
import { User } from "./users.entity";
import { Workspace } from "./workspace.entity";

const entities = [Workspace, SiteProfile, User];

export { Workspace, SiteProfile, User }
export default entities;