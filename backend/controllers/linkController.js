import Link from '../models/Link.js';

/**
 * @desc    Get all links for logged in user
 * @route   GET /api/links
 * @access  Private
 */
export const getLinks = async (req, res, next) => {
  try {
    const links = await Link.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: links.length,
      data: links,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single link
 * @route   GET /api/links/:id
 * @access  Private
 */
export const getLink = async (req, res, next) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found',
      });
    }

    // Make sure link belongs to user
    if (link.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this link',
      });
    }

    res.status(200).json({
      success: true,
      data: link,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new link
 * @route   POST /api/links
 * @access  Private
 */
export const createLink = async (req, res, next) => {
  try {
    const { title, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and URL',
      });
    }

    // Ensure URL has protocol
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const link = await Link.create({
      user: req.user.id,
      title,
      url: formattedUrl,
    });

    res.status(201).json({
      success: true,
      data: link,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update link
 * @route   PUT /api/links/:id
 * @access  Private
 */
export const updateLink = async (req, res, next) => {
  try {
    let link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found',
      });
    }

    // Make sure link belongs to user
    if (link.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this link',
      });
    }

    // Format URL if provided
    if (req.body.url) {
      let formattedUrl = req.body.url.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }
      req.body.url = formattedUrl;
    }

    link = await Link.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: link,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete link
 * @route   DELETE /api/links/:id
 * @access  Private
 */
export const deleteLink = async (req, res, next) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found',
      });
    }

    // Make sure link belongs to user
    if (link.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this link',
      });
    }

    await link.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Link deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

