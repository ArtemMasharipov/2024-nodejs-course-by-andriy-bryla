import RoleDBService from '../models/role/roleService.mjs';

export const getAllRoles = async (req, res) => {
	const roles = await RoleDBService.getAllRoles();
	res.render('roles/role_list', { roles });
};

export const getRoleDetails = async (req, res) => {
	const role = await RoleDBService.getRoleById(req.params.id);
	if (!role) return res.status(404).send('Role not found');
	res.render('roles/role_details', { role });
};

export const createRole = async (req, res) => {
	const role = await RoleDBService.createRole(req.body);
	res.redirect(`/roles/${role._id}`);
};

export const updateRole = async (req, res) => {
	const role = await RoleDBService.updateRole(req.params.id, req.body);
	if (!role) return res.status(404).send('Role not found');
	res.redirect(`/roles/${role._id}`);
};

export const deleteRole = async (req, res) => {
	await RoleDBService.deleteRole(req.params.id);
	res.redirect('/roles');
};
