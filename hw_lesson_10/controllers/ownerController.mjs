import OwnersDBService from '../models/owner/OwnersDBService.mjs';
import { handleError } from '../services/error-handler.mjs';

export const getAllOwners = async (req, res) => {
	try {
		const owners = await OwnersDBService.getList();
		res.render('owners/owner_list', { owners });
	} catch (err) {
		handleError(res, 'Failed to fetch owners');
	}
};

export const getOwnerDetails = async (req, res) => {
	try {
		const owner = await OwnersDBService.getById(req.params.id);
		if (!owner) return handleError(res, 'Owner not found', 404);
		res.render('owners/owner_details', { owner });
	} catch (err) {
		handleError(res, 'Failed to fetch owner details');
	}
};

export const showCreateOwnerForm = async (req, res) => {
	res.render('owners/owner_form', { owner: null, errors: [] });
};

export const createOwner = async (req, res) => {
	try {
		await OwnersDBService.create(req.body);
		res.redirect('/owners');
	} catch (err) {
		res.render('owners/owner_form', {
			owner: req.body,
			errors: [{ msg: 'Failed to create owner' }]
		});
	}
};

export const showEditOwnerForm = async (req, res) => {
	try {
		const owner = await OwnersDBService.getById(req.params.id);
		if (!owner) return handleError(res, 'Owner not found', 404);
		res.render('owners/owner_form', { owner, errors: [] });
	} catch (err) {
		handleError(res, 'Failed to load edit form');
	}
};

export const updateOwner = async (req, res) => {
	try {
		const owner = await OwnersDBService.updateOwner(req.params.id, req.body);
		if (!owner) return handleError(res, 'Owner not found', 404);
		res.redirect('/owners');
	} catch (err) {
		res.render('owners/owner_form', {
			owner: { ...req.body, id: req.params.id },
			errors: [{ msg: 'Failed to update owner' }]
		});
	}
};

export const deleteOwner = async (req, res) => {
	try {
		await OwnersDBService.deleteOwner(req.params.id);
		res.redirect('/owners');
	} catch (err) {
		handleError(res, 'Failed to delete owner');
	}
};