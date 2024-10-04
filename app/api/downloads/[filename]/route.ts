import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const { fileName } = req.query;

  if (!fileName) {
    return res.status(400).json({ error: 'Missing filename parameter' });
  }

  const filePath = path.join(process.cwd(), 'public', 'downloadables', fileName);

  try {
    const fileData = await fs.readFile(filePath);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'); // Adjust content type based on file type
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.send(fileData);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
}
